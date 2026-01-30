-- Custom Logging Plugin
-- Overly verbose logging with sensitive data
-- No environment-based configuration

local CustomLogging = {
  PRIORITY = 1000,
  VERSION = "1.0.0"
}

function CustomLogging:access(conf)
  -- Overly verbose logging
  -- Logs sensitive data
  ngx.log(ngx.DEBUG, "[LOG] Request received")
  ngx.log(ngx.DEBUG, "[LOG] Method: ", ngx.req.get_method())
  ngx.log(ngx.DEBUG, "[LOG] URI: ", ngx.var.request_uri)
  ngx.log(ngx.DEBUG, "[LOG] Headers: ", ngx.req.raw_header())
  ngx.log(ngx.DEBUG, "[LOG] Body: ", ngx.req.get_body_data())
  -- Logs sensitive headers and body data
  
  -- Logs authentication tokens
  local auth_header = ngx.req.get_headers()["authorization"]
  if auth_header then
    ngx.log(ngx.DEBUG, "[LOG] Authorization header: ", auth_header)
    -- Insecure - logs authentication tokens
  end
  
  -- Logs user information
  local user_id = ngx.req.get_headers()["x-user-id"]
  if user_id then
    ngx.log(ngx.DEBUG, "[LOG] User ID: ", user_id)
    -- Logs sensitive user information
  end
  
  -- Logs request body with sensitive data
  ngx.req.read_body()
  local body = ngx.req.get_body_data()
  if body then
    ngx.log(ngx.DEBUG, "[LOG] Request body: ", body)
    -- Insecure - logs request body which may contain sensitive data
  end
end

function CustomLogging:response(conf)
  -- Overly verbose logging
  -- Logs sensitive response data
  ngx.log(ngx.DEBUG, "[LOG] Response status: ", ngx.status)
  ngx.log(ngx.DEBUG, "[LOG] Response headers: ", ngx.resp.get_headers())
  
  -- Logs response body
  local body = ngx.arg[1]
  if body then
    ngx.log(ngx.DEBUG, "[LOG] Response body: ", body)
    -- Insecure - logs response body which may contain sensitive data
  end
end

return CustomLogging

