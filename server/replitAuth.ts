import passport from 'passport';
import { Strategy as ReplitStrategy } from '@replit/passport-replit';
import session from 'express-session';
import type { Express, Request, Response, NextFunction } from 'express';

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

  // Configure Replit Strategy with proper error handling
  passport.use('replit', new ReplitStrategy({
    clientID: 'replit',
    clientSecret: 'replit',
    callbackURL: '/api/auth/callback',
    scope: ['user']
  }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      // Create a user object from the profile
      const user = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        displayName: profile.displayName,
        claims: {
          sub: profile.id,
          username: profile.username,
          email: profile.email
        }
      };
      return done(null, user);
    } catch (error) {
      console.error('Auth strategy error:', error);
      return done(error, null);
    }
  }));

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  // Auth routes with better error handling
  app.get('/api/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('replit', {
      scope: ['user'],
      failureRedirect: '/?error=auth_failed'
    })(req, res, next);
  });

  app.get('/api/auth/callback', 
    (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('replit', { 
        failureRedirect: '/?error=callback_failed',
        successRedirect: '/'
      })(req, res, next);
    }
  );

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
  if (req.user && req.user.claims && req.user.claims.sub) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}