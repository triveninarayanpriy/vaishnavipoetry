import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data/siteConfig.json');

const defaultSettings = {
  siteName: 'Vaishnavi Poetry',
  siteUrl: 'https://vaishnavipoetry.me',
  siteDescription: 'Explore poetry celebrating nature, memory, and the human condition through thoughtful verse and observation.',
  siteKeywords: 'poetry, nature poetry, original poetry, literature, creative writing',
  authorName: 'Vaishnavi',
  headerLogo: '',
  headerLogoText: 'Vaishnavi',
  showAdminLink: true,
  footerText: 'A quiet space for poetry and reflection.',
  footerCopyright: '© 2026 Vaishnavi Poetry. All rights reserved.',
  socialTwitter: '',
  socialInstagram: '',
  socialEmail: '',
  navItems: [
    { label: 'Home', href: '/', enabled: true },
    { label: 'Poems', href: '/poems', enabled: true },
    { label: 'About', href: '/about', enabled: true },
    { label: 'Admin', href: '/admin', enabled: true },
  ],
};

export async function GET() {
  try {
    if (!fs.existsSync(configPath)) {
      return NextResponse.json(defaultSettings);
    }

    const fileContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(fileContent);

    return NextResponse.json({
      ...defaultSettings,
      ...config,
    });
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json(defaultSettings);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Merge with default settings
    const settings = {
      ...defaultSettings,
      ...body,
    };

    // Ensure directory exists
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(settings, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
