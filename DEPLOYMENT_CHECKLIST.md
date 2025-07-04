# 🚀 Vercel Deployment Checklist for GrantForge.cloud

## ✅ Pre-Deployment Checklist

### 1. **Code Fixes Applied**
- ✅ Fixed React rendering error in `/write` page
- ✅ Updated proposal state to handle both string and object types
- ✅ All build errors resolved

### 2. **Environment Variables Setup**

**In Vercel Dashboard → Settings → Environment Variables:**

#### Required (for basic functionality):
```env
PAYPAL_PAYMENT_LINK=https://www.paypal.com/ncp/links/YWT36BXE9XVHW
```

#### Optional (for full external API integration):
```env
AI_API_KEY=your_openai_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
BREVO_API_KEY=your_brevo_api_key_here
BREVO_TEMPLATE_ID=1
HUBSPOT_API_KEY=your_hubspot_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_service_role_key_here
```

### 3. **Vercel Configuration**
- ✅ `vercel.json` is properly configured
- ✅ Redirects set up (`/discover` → `/grants`)
- ✅ Security headers configured
- ✅ Environment variable mapping ready

## 🚀 Deployment Steps

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the `grantforge.cloud` repository

### Step 2: Configure Project
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### Step 3: Set Environment Variables
1. Go to Project Settings → Environment Variables
2. Add each variable from the list above
3. Set to **Production** environment
4. Click "Save"

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Check for any build errors

## 🔍 Post-Deployment Verification

### Test These Features:
1. **Homepage**: `https://grantforge.cloud`
2. **Grant Discovery**: `https://grantforge.cloud/grants`
3. **AI Writer**: `https://grantforge.cloud/write`
4. **Account Dashboard**: `https://grantforge.cloud/account`
5. **Pricing**: `https://grantforge.cloud/pricing`

### API Endpoints to Test:
- `POST /api/generate` - AI proposal generation
- `POST /api/lead` - Lead capture

## 🛠️ Troubleshooting

### Common Issues:

#### Build Errors
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation passes locally
- Check for missing environment variables

#### Runtime Errors
- Verify environment variables are set correctly
- Check browser console for client-side errors
- Review Vercel function logs

#### API Issues
- Ensure API routes are in `app/api/` directory
- Check that environment variables are accessible
- Verify CORS settings if needed

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Set up error tracking
- Monitor API function performance

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 🔄 Continuous Deployment

### GitHub Integration
- Push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Branch deployments for testing

### Environment Management
- **Production**: `main` branch
- **Preview**: Pull requests
- **Development**: Local development

## 📝 Notes

- The application works without external API keys (template-based AI)
- User data is stored in localStorage (client-side)
- For production, consider adding a database for user persistence
- PayPal integration is ready with the provided payment link

## 🎯 Success Criteria

✅ Application deploys without errors
✅ All pages load correctly
✅ AI proposal generation works
✅ Lead capture form functions
✅ User management system works
✅ Grant discovery and saving works
✅ Account dashboard shows real data 