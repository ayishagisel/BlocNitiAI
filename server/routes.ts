import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  updateUserProfileSchema, 
  insertRepairIssueSchema, 
  insertHarassmentReportSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User profile routes
  app.put('/api/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = updateUserProfileSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          details: validationError.toString() 
        });
      }

      const updatedUser = await storage.updateUserProfile(userId, result.data);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Repair issues routes
  app.get('/api/repair-issues', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const repairIssues = await storage.getRepairIssuesByUserId(userId);
      res.json(repairIssues);
    } catch (error) {
      console.error("Error fetching repair issues:", error);
      res.status(500).json({ message: "Failed to fetch repair issues" });
    }
  });

  app.post('/api/repair-issues', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = insertRepairIssueSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          details: validationError.toString() 
        });
      }

      // Create repair issue
      const repairIssue = await storage.createRepairIssue(userId, result.data);

      // Get AI analysis
      try {
        const aiAnalysis = await getAIAnalysis(result.data.issueDescription);
        await storage.updateRepairIssueAIAnalysis(repairIssue.id, aiAnalysis);

        // Fetch updated repair issue with AI analysis
        const updatedRepairIssue = await storage.getRepairIssue(repairIssue.id);
        res.json(updatedRepairIssue);
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
        // Return repair issue without AI analysis
        res.json(repairIssue);
      }
    } catch (error) {
      console.error("Error creating repair issue:", error);
      res.status(500).json({ message: "Failed to create repair issue" });
    }
  });

  app.delete('/api/repair-issues/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const repairIssueId = parseInt(req.params.id);

      await storage.deleteRepairIssue(repairIssueId, userId);
      res.json({ message: "Repair issue deleted successfully" });
    } catch (error) {
      console.error("Error deleting repair issue:", error);
      res.status(500).json({ message: "Failed to delete repair issue" });
    }
  });

  // Harassment reports routes
  app.get('/api/harassment-reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reports = await storage.getHarassmentReportsByUserId(userId);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching harassment reports:", error);
      res.status(500).json({ message: "Failed to fetch harassment reports" });
    }
  });

  app.post('/api/harassment-reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = insertHarassmentReportSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          details: validationError.toString() 
        });
      }

      const report = await storage.createHarassmentReport(userId, result.data);
      res.json(report);
    } catch (error) {
      console.error("Error creating harassment report:", error);
      res.status(500).json({ message: "Failed to create harassment report" });
    }
  });

  // Voice transcription endpoint
  app.post('/api/transcribe', isAuthenticated, async (req: any, res) => {
    try {
      const { audioData } = req.body;

      if (!audioData) {
        return res.status(400).json({ message: "Audio data is required" });
      }

      // For now, we'll use the browser's built-in Web Speech API
      // In a production environment, you might want to use Whisper API
      res.json({ 
        message: "Transcription should be handled client-side with Web Speech API",
        success: false 
      });
    } catch (error) {
      console.error("Error with transcription:", error);
      res.status(500).json({ message: "Failed to process transcription" });
    }
  });

  // Auth routes
  app.get('/api/login', (req, res) => {
    try {
      const authUrl = auth.getAuthUrl();
      console.log('Redirecting to auth URL:', authUrl);
      res.redirect(authUrl);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to initiate login' });
    }
  });

  app.get('/api/callback', async (req, res) => {
    try {
      const token = req.query.token as string;
      const code = req.query.code as string;

      console.log('Callback received - token:', !!token, 'code:', !!code);

      if (token) {
        const userInfo = await auth.authenticateWithToken(token);
        req.session.userId = userInfo.id;
        req.session.userInfo = userInfo;
        console.log('User authenticated:', userInfo.id);
        res.redirect('/dashboard');
      } else if (code) {
        // Handle OAuth code flow
        const userInfo = await auth.authenticate(req, res);
        if (userInfo) {
          req.session.userId = userInfo.id;
          req.session.userInfo = userInfo;
          console.log('User authenticated via code:', userInfo.id);
          res.redirect('/dashboard');
        } else {
          throw new Error('Authentication failed');
        }
      } else {
        console.error('No token or code provided');
        res.redirect('/?error=no_auth_data');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      res.redirect('/?error=auth_failed');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// AI Analysis using OpenRouter API
async function getAIAnalysis(issueDescription: string) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY || "default_key";

  const prompt = `
You are Alma, an AI assistant specializing in NYC housing law and HPD violations. 
Analyze the following repair issue and provide:

1. HPD Violation Class (A, B, C, or I if applicable)
2. Correction deadline based on violation class
3. Brief explanation of legal urgency and potential penalties

Issue description: "${issueDescription}"

Respond in this JSON format:
{
  "violationClass": "A|B|C|I|Unknown",
  "deadline": "24-72 hours|30 days|90 days|Unknown",
  "analysis": "Brief explanation of the legal classification and urgency"
}

Guidelines:
- Class A: Immediate hazards (no heat/hot water, gas leaks, exposed wiring) - 24-72 hours
- Class B: Hazardous conditions (defective windows, peeling paint, plumbing leaks) - 30 days  
- Class C: Non-hazardous but affects quality (cosmetic damage, minor issues) - 90 days
- If uncertain, classify as "Unknown" and suggest resources
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.REPLIT_DOMAINS?.split(',')[0] || 'http://localhost:5000',
        'X-Title': 'BlocNiti AI'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(aiResponse);
      return {
        hpdViolationClass: parsed.violationClass,
        correctionDeadline: parsed.deadline,
        aiAnalysis: parsed.analysis
      };
    } catch (parseError) {
      // If JSON parsing fails, return the raw response
      return {
        hpdViolationClass: 'Unknown',
        correctionDeadline: 'Unknown',
        aiAnalysis: aiResponse
      };
    }
  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      hpdViolationClass: 'Unknown',
      correctionDeadline: 'Unknown',
      aiAnalysis: "I'm not sure about the exact violation class, but here are some resources that might help. For immediate hazards, contact 311 or your local HPD office."
    };
  }
}