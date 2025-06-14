
import passport from 'passport';
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

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  // Replit Auth routes using standard pattern
  app.get('/api/login', (req: Request, res: Response) => {
    const authUrl = `https://replit.com/auth_with_repl_site?domain=${req.get('host')}`;
    res.redirect(authUrl);
  });

  // Auth callback to handle successful authentication
  app.get('/api/auth/callback', (req: Request, res: Response) => {
    // Check if there's a stored redirect from the session
    const redirectPath = (req.session as any)?.authRedirect;
    
    if (redirectPath) {
      // Clear the stored redirect
      delete (req.session as any).authRedirect;
      res.redirect(redirectPath);
    } else {
      // Default redirect to dashboard
      res.redirect('/dashboard');
    }
  });

  // User info endpoint is handled in routes.ts

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
  const userId = req.headers['x-replit-user-id'] as string;
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Set user info for downstream middleware
  req.user = {
    claims: {
      sub: userId,
      username: req.headers['x-replit-user-name'],
      email: req.headers['x-replit-user-email']
    }
  };

  next();
}
