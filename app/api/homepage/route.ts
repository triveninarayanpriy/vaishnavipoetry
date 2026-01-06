let homepageHeader = {
  title: 'The Tactile Verse',
  subtitle: 'Nature distilled into words. An unbleached, minimalist collection of tactile poetry exploring the spaces between thought and feeling.'
};

export async function GET() {
  return Response.json({
    title: homepageHeader.title,
    subtitle: homepageHeader.subtitle
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (body.title) homepageHeader.title = body.title;
    if (body.subtitle) homepageHeader.subtitle = body.subtitle;
    
    return Response.json({
      success: true,
      data: homepageHeader
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: 'Failed to update homepage header'
    }, { status: 400 });
  }
}
