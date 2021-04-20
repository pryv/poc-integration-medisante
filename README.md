# bridge-medisante

Bridge for Médisanté devices.

Deployed on **bridge-medisante.pryv.net:/home/kebetsi/pryv/bridge-medisante**.  
To update it: `git pull` with user *kebetsi* (uses GitHub Deploy key)

Prerequisites: Node v8+, Yarn v1+

## How to?

| Task                              | Command                        |
| --------------------------------- | ------------------------------ |
| Setup                             | `yarn`                         |
| Run API server                    | `yarn start`                   |

[NGINX setup](nginx)

## Test

You can test it with the following cURL:

```bash
curl -X POST -H 'content-type: application/json' -d '{
  "metadata":{"measurementType":"BodyWeightComposition"},
  "measurements": {
    "timestamp":1618927736,
    "bodyWeight":{"value":80}
  }}' "https://bridge-medisante.pryv.net/data"
```
