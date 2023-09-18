const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const credential = new DefaultAzureCredential();

  const keyVaultName = "codeup";
  const url = "https://" + keyVaultName + ".vault.azure.net";

  const client = new SecretClient(url, credential);

  // Create a secret
  // The secret can be a string of any kind. For example,
  // a multiline text block such as an RSA private key with newline characters,
  // or a stringified JSON object, like `JSON.stringify({ mySecret: 'pk.eyJ1IjoiamVzc2ljYXJvc2llciIsImEiOiJjbG1mOGpqeTkwMzVuM2RwY3hjMzFkNWd3In0._i86AyUfYsuxqnS945xqrA'})`.
  const secretName = "MAPBOX_KEY";
  const result = await client.setSecret(
    secretName,
    "pk.eyJ1IjoiamVzc2ljYXJvc2llciIsImEiOiJjbG1mOGpqeTkwMzVuM2RwY3hjMzFkNWd3In0._i86AyUfYsuxqnS945xqrA",
  );
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(
    secretName,
    result.properties.version,
    {
      enabled: false,
    },
  );
  console.log("updated secret: ", updatedSecret);

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
