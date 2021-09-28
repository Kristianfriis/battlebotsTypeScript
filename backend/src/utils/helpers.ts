export function createJsonToSend(input : any) : string {
    return `data: ${JSON.stringify(input)}\n\n`
}