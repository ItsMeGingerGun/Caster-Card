import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { NextResponse } from 'next/server';
import { 
  saveTemplate, 
  getTemplate, 
  getUserTemplates, 
  deleteTemplate 
} from '@/app/lib/redis';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.fid) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { theme_config, is_public } = await req.json();
    
    const templateId = await saveTemplate({
      fid: session.user.fid,
      theme_config: JSON.stringify(theme_config),
      is_public: Boolean(is_public),
    });
    
    return NextResponse.json({ id: templateId });
  } catch (error) {
    console.error('Template save error:', error);
    return NextResponse.json(
      { error: 'Failed to save template' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const templateId = url.searchParams.get('id');
  
  // Get specific template
  if (templateId) {
    const template = await getTemplate(templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(template);
  }
  
  // Get user templates
  if (session?.user?.fid) {
    const templates = await getUserTemplates(session.user.fid);
    return NextResponse.json(templates);
  }
  
  // Get public templates
  const templates = await getPublicTemplates();
  return NextResponse.json(templates);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.fid) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { id } = await req.json();
    await deleteTemplate(id, session.user.fid);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Template delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
