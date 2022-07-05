type RepsonseOk = {
  [name: string]: any
  meta: any
}

type ResponseKo = {
  err: {
    code: number
    status: string
    description: string
  }
}

export function success(resource: any, meta: any = {}): RepsonseOk {
  const name = resource.constructor.name

  return { [name.toLowerCase()]: resource.toJSON(), meta }
}

export function error({ code,status }: { code: number; status: string }, err: any): ResponseKo {
  const description = err.detail ? err.detail : err.message

  return {
    err: {
      code,
      status,
      description,
    },
  }
}
