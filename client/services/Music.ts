const apiUrl = 'https://deno-harmonica-toolkit-api.deno.dev'

export const transpose = (tablature: string, pitchAdjustment: number): Promise<string> => {
  const url = new URL(`${apiUrl}/harmonica/transpose`)
  const body = JSON.stringify({ tablature, pitchAdjustment })
  return fetch(url.toString(), { method: 'post', body })
    .then(r => r.text())
}