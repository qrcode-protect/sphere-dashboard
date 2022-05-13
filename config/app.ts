const config = {
  name       : process.env.APP_NAME,
  env        : process.env.APP_ENV || 'dev',
  port       : process.env.APP_PORT || 4000,
  maintenance: process.env.APP_MAINTENANCE || false,

  public: process.env.PUBLIC_PATH,
}

export const namespaces = {
  controller: '@app/http/controllers'
}


export default config
