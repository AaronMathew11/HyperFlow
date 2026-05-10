# Hypervision Setup Guide

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name: "Hypervision" (or your preferred name)
   - Database password: (choose a strong password)
   - Region: (select closest to your users)
4. Click "Create new project" and wait for it to initialize

### 2. Configure Google OAuth

1. In your Supabase project, go to **Authentication** → **Providers**
2. Find **Google** in the list and enable it
3. You'll need to set up Google OAuth credentials:

#### Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the OAuth consent screen if prompted
6. Choose **Web application** as application type
7. Add these to **Authorized JavaScript origins**:
   ```
   https://your-project-ref.supabase.co
   ```
8. Add these to **Authorized redirect URIs**:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
9. Click **Create** and copy your **Client ID** and **Client Secret**

#### Configure in Supabase:

1. Back in Supabase, paste your **Client ID** and **Client Secret**
2. Click **Save**

### 3. Get Your Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (anon/public key)
   - **anon public** key

### 4. Set Up Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173)

## Vercel Deployment

### 1. Push to GitHub

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - Click **Environment Variables**
   - Add `VITE_SUPABASE_URL` with your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` with your Supabase anon key

6. Click **Deploy**

### 3. Update Google OAuth Redirect URIs

After deployment, add your Vercel URL to Google OAuth:

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials** → Your OAuth 2.0 Client
3. Add to **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   ```
4. Add to **Authorized redirect URIs**:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
5. Click **Save**

### 4. Update Supabase Site URL

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `https://your-app.vercel.app`
3. Add `https://your-app.vercel.app/**` to **Redirect URLs**
4. Click **Save**

## Testing Authentication

1. Visit your deployed app
2. Click "Sign in with Google"
3. Complete the Google OAuth flow
4. You should be redirected back and signed in!

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure you've created a `.env` file with the correct variables
- Restart your dev server after adding environment variables

### OAuth redirect mismatch
- Ensure all redirect URIs in Google Cloud Console match your Supabase callback URL
- Check that Site URL in Supabase matches your deployment URL

### Build fails on Vercel
- Ensure all environment variables are set in Vercel dashboard
- Check build logs for specific errors

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
