var express = require("express");
var router = express.Router();

const crypto = require("crypto");
const { time } = require("console");

router.post("/request", function (req, res) {
  var requestHeader = req.headers;

  const data = {
    order: {
      invoice_number: "inv-" + Date.now(+7),
      amount: 150000,
    },
    virtual_account_info: {
      virtual_account_number:
        req.body["virtual_account_info"]["virtual_account_number"],
      info1: "Thanks for shooping",
      info2: "Candi Store",
      info3: "Have a sweet day",
    },
    virtual_account_inquiry: {
      status: "success",
    },
    customer: {
      name: "Node",
      email: "tot1@gmail.com",
    },
  };

  function generateDigest(jsonBody) {
    let jsonStringHash256 = crypto
      .createHash("sha256")
      .update(jsonBody, "utf-8")
      .digest();

    let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString("base64");
  }

  function generateSignature(
    clientId,
    requestId,
    requestTimestamp,
    requestTarget,
    digest,
    secret
  ) {
    // Prepare Signature Component
    console.log("----- Component Signature -----");
    let componentSignature = "Client-Id:" + clientId;
    componentSignature += "\n";
    componentSignature += "Request-Id:" + requestId;
    componentSignature += "\n";
    componentSignature += "Response-Timestamp:" + requestTimestamp;
    componentSignature += "\n";
    componentSignature += "Request-Target:" + requestTarget;
    // If body not send when access API with HTTP method GET/DELETE
    if (digest) {
      componentSignature += "\n";
      componentSignature += "Digest:" + digest;
    }

    console.log(componentSignature.toString());
    console.log();

    // Calculate HMAC-SHA256 base64 from all the components above
    let hmac256Value = crypto
      .createHmac("sha256", secret)
      .update(componentSignature.toString())
      .digest();

    let bufferFromHmac256Value = Buffer.from(hmac256Value);
    let signature = bufferFromHmac256Value.toString("base64");
    // Prepend encoded result with algorithm info HMACSHA256=
    return "HMACSHA256=" + signature;
  }

  const datadigest = JSON.stringify(data);
  const digiest = generateDigest(datadigest);
  const requestTarget = "/inquiry/request";
  const signatureFucntion = generateSignature(
    requestHeader["client-id"],
    requestHeader["request-id"],
    requestHeader["request-timestamp"],
    requestTarget,
    digiest,
    "SK-MqFkUSSNlr7s6Gicnzey"
  );

  // clientId = 'BRN-0274-1663724114561'
  // secret = 'SK-MqFkUSSNlr7s6Gicnzey'

  res.setHeader("Client-Id", requestHeader["client-id"]);
  res.setHeader("Request-Id", requestHeader["request-id"]);
  res.setHeader("Response-Timestamp", requestHeader["request-timestamp"]);
  res.setHeader("Signature", signatureFucntion);
  res.setHeader("Digest", digiest);
  res.json(data);
  // res.end(JSON.stringify(data));
});

module.exports = router;
