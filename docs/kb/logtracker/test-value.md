---
description: >-
  Explains how to resolve MongoDB connection timeouts for the Netwrix Change
  Tracker Hub by increasing IIS pool capacity and adjusting the MongoDB
  connection string timeout and pool size.
keywords:
  - netwrix
  - Netwrix Change Tracker
  - mongodb
  - timeout
  - iisreset
  - connectionString
  - maxPoolSize
  - connectTimeoutMS
  - hub
products:
  - general
sidebar_label: test_value
tags: []
title: "test_value"
knowledge_article_id: kA0Qk0000000bHJKAY
---

# test_value

## Symptom

The hub service log file in Netwrix Change Tracker contains the following error:

```text
MongoDB.Driver.MongoConnectionException: An exception occurred while receiving a message from the server.

System.IO.IOException: Unable to read data from the transport connection: 
A connection attempt failed because the connected party did not properly respond after a period of time,
or established connection failed because connected host has failed to respond.

System.Net.Sockets.SocketException (10060): 
A connection attempt failed because the connected party did not properly respond after a period of time,
or established connection failed because connected host has failed to respond.
```

## Cause

Requests between the Netwrix Change Tracker Hub and MongoDB instance time out.

## Resolution

Increase the IIS pool size and the timeout limit to prevent requests from timing out:

1. Stop your IIS instance. Run the following line in elevated Command Prompt:

   ```text
   iisreset /stop
   ```

2. Navigate to `C:\inetpub\wwwroot\Change Tracker Generation 7 (NetCore) Hub\Configs\` and locate the `appsettings.Production.json` file.

3. Back up the file and open the original file. In the file, locate the following line:

   ```text
   "connectionString": "mongodb://%IP_address%"
   ```

   Edit the line to reflect the following changes:

   ```text
   "connectionString": "mongodb://%IP_address%/?maxPoolSize=500&connectTimeoutMS=120000"
   ```

4. Save the changes and start your IIS instance. Run the following line in elevated Command Prompt:

   ```text
   iisreset /start
   ```
