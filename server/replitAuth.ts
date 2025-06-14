
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcryptjs';
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

  // Twitter OAuth Strategy
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'your-twitter-consumer-key',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'your-twitter-consumer-secret',
    callbackURL: "/api/auth/twitter/callback"
  }, async (token, tokenSecret, profile, done) => {
    try {
      const userInfo = {
        id: profile.id,
        email: profile.emails?.[0]?.value || '',
        firstName: profile.displayName?.split(' ')[0] || profile.username || '',
        lastName: profile.displayName?.split(' ').slice(1).join(' ') || '',
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

  // Facebook OAuth Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || 'your-facebook-app-id',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'your-facebook-app-secret',
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'photos']
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

  // Local Strategy for email/password
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Invalid email or password' });
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

  // OAuth Routes
  
  // Google
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

  // GitHub
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

  // Twitter
  app.get('/api/auth/twitter', (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
    passport.authenticate('twitter')(req, res, next);
  });

  app.get('/api/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      const redirectPath = (req.session as any)?.authRedirect || '/dashboard';
      delete (req.session as any).authRedirect;
      res.redirect(redirectPath);
    }
  );

  // Facebook
  app.get('/api/auth/facebook', (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
  });

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      const redirectPath = (req.session as any)?.authRedirect || '/dashboard';
      delete (req.session as any).authRedirect;
      res.redirect(redirectPath);
    }
  );

  // Local email/password registration and login
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const user = await storage.createUser({
        id: userId,
        email,
        firstName,
        lastName,
        password: hashedPassword
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed after registration' });
        }
        res.json({ user });
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  app.post('/api/auth/login',
    passport.authenticate('local'),
    (req: Request, res: Response) => {
      res.json({ user: req.user });
    }
  );

  // Legacy login endpoint for backwards compatibility
  app.get('/api/login', (req: Request, res: Response) => {
    const redirect = req.query.redirect as string;
    if (redirect) {
      (req.session as any).authRedirect = redirect;
    }
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
