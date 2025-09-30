export function success(message: string, data?: unknown) {
  return { status: 200, message, data };
}

export function created(message: string, data?: unknown) {
  return { status: 201, message, data };
}

export function notFound(message: string) {
  return { status: 404, message };
}
