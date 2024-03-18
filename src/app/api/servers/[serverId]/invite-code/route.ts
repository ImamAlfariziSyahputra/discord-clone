import { createId } from '@paralleldrive/cuid2';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return Response.json('Unauthorized', { status: 401 });

    if (!params.serverId)
      return Response.json('Server ID missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: createId(),
      },
    });

    return Response.json(server);
  } catch (err) {
    console.log('[SERVER_ID] =>', err);
    return Response.json('Internal Server Error', { status: 500 });
  }
}
