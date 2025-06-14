
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session';
import type { Express, Request, Response, NextFunction } from 'express';
import { storage } from './storage';

export async function setupAuth(app: Express) {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'blocniti-secret-key-2024',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const userInfo = {
        id: profile.id,
        email: profile.emails?.[0]?.value || '',
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        profileImageUrl: profile.photos?.[0]?.value || ''
      };

      let user = await storage.getUser(profile.id);
      if (!user) {
        user = await storage.createUser(userInfo);
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));

  // GitHub OAuth Strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'your-github-client-id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your-github-client-secret',
    callbackURL: "/api/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const userInfo = {
        id: profile.id.toString(),
        email: profile.emails?.[0]?.value || '',
        firstName: profile.displayName?.split(' ')[0] || profile.username || '',
        lastName: profile.displayName?.split(' ').slice(1).join(' ') || '',
        profileImageUrl: profile.photos?.[0]?.value || ''
      };

      let user = await storage.getUser(profile.id.toString());
      if (!user) {
        user = await storage.createUser(userInfo);
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth routes - these should NOT require authentication
  app.get('/api/auth/google', (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  });

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      const redirectPath = (req.session as any)?.authRedirect || '/dashboard';
      delete (req.session as any).authRedirect;
      res.redirect(redirectPath);
    }
  );

  // GitHub OAuth routes - these should NOT require authentication
  app.get('/api/auth/github', (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  });

  app.get('/api/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      const redirectPath = (req.session as any)?.authRedirect || '/dashboard';
      delete (req.session as any).authRedirect;
      res.redirect(redirectPath);
    }
  );

  // Legacy login endpoint for backwards compatibility
  app.get('/api/login', (req: Request, res: Response) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
    // Redirect to main login page where users can choose their provider
    res.redirect('/#/login');
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          console.error('Session destroy error:', sessionErr);
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
      });
    });
  });
}

export function isAuthenticated(req: any, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}
