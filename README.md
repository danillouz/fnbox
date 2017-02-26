# fun😄x
Function sandbox PoC.

# Running locally
```
npm i && npm run dev
```

# Executing a function in a sandbox
After starting the service with `npm run dev`, make an HTTP `POST` request to
the `/run` endpoint. You must send a JSON payload containing a `fn` property,
which represents the function you want to execute as a String.

## Example
**Request**

```
POST /run
Content-Type: application/json

{
	"fn": "() => 2 + 2"
}
```

**Response**

```
{
	"fn": "() => 2 + 2",
	"result": 4
}
```

# License
MIT Copyright (c) 2017 Daniël Illouz
