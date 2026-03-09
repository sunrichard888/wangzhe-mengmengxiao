import request from 'supertest';
import { initDatabase, closeDatabase } from '../../src/backend/db/sqlite';

describe('API Integration Tests', () => {
  let app: any;
  let server: any;

  beforeAll(async () => {
    // Initialize database
    await initDatabase();
    
    // Import app after database init
    const appModule = await import('../../src/backend/server');
    app = appModule.default;
  });

  afterAll(() => {
    closeDatabase();
  });

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('Leaderboard API', () => {
    it('should return empty leaderboard initially', async () => {
      const response = await request(app).get('/api/leaderboard');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should accept new score submission', async () => {
      const scoreData = {
        player_name: 'TestPlayer',
        score: 1500,
        level: 1,
      };

      const response = await request(app)
        .post('/api/leaderboard')
        .send(scoreData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.player_name).toBe('TestPlayer');
      expect(response.body.data.score).toBe(1500);
    });

    it('should reject invalid score submission', async () => {
      const response = await request(app)
        .post('/api/leaderboard')
        .send({ player_name: 'Test' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return leaderboard with submitted scores', async () => {
      // Submit another score
      await request(app)
        .post('/api/leaderboard')
        .send({
          player_name: 'Player2',
          score: 2000,
          level: 1,
        });

      const response = await request(app).get('/api/leaderboard?limit=10');
      
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.data[0].score).toBeGreaterThanOrEqual(1500);
    });
  });

  describe('Levels API', () => {
    it('should return list of levels', async () => {
      const response = await request(app).get('/api/levels');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return specific level', async () => {
      const response = await request(app).get('/api/levels/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.name).toBeDefined();
    });

    it('should return 404 for non-existent level', async () => {
      const response = await request(app).get('/api/levels/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('should accept level completion', async () => {
      const response = await request(app)
        .put('/api/levels/1/complete')
        .send({
          player_id: 'test-player-123',
          score: 1500,
          moves: 15,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown');
      
      expect(response.status).toBe(404);
    });
  });
});
