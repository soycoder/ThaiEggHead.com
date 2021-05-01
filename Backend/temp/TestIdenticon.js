import identicon from "identicon";
import fs from "fs";
import path from "path";
import sha1 from "sha1";

let user = { username: "om.apisith" };

const identify = { id: sha1(user.username), size: 150 };

// Asynchronous API
identicon.generate(identify, (err, buffer) => {
  if (err) throw err;

  // buffer is identicon in PNG format.
  fs.writeFileSync(
    path.resolve("./temp/") + `/${identify.id}-${identify.size}.png`,
    buffer
  );
});

// Synchronous API
// const buffer = identicon.generateSync({ id: "ajido", size: 40 });
// console.log(buffer);
