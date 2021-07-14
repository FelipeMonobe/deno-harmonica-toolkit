import * as music from '../../services/Music.ts'

export const transpose = async ({ request, response }) => {
  if (!request.hasBody) return Reflect.set(response, 'body', 'Invalid request body.')
  const { tablature, pitchAdjustment } = await request.body({ type: 'json' }).value
  return Reflect.set(response, 'body', music.transpose(tablature, pitchAdjustment))
}