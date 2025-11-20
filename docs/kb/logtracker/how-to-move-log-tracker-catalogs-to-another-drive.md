---
description: >-
  Shows how to move the Log Tracker catalogs folder to another drive by copying
  the catalogs, creating a directory symbolic link, and restarting the CorreLog
  Framework service to free disk space.
keywords:
  - catalogs
  - mklink
  - CorreLog
  - disk-space
  - move-catalogs
  - NNT
  - net-stop
  - net-start
  - catalogs.delete
products:
  - logtracker
sidebar_label: How to Move Log Tracker Catalogs to Another Drive?
tags: []
title: "How to Move Log Tracker Catalogs to Another Drive?"
knowledge_article_id: kA0Qk0000000MOjKAM
---

# How to Move Log Tracker Catalogs to Another Drive?

## Question

The **Catalogs** folder is increasing in size and consumes disk space. How do you move this folder to another disk?

## Answer

Follow the procedure below to move the **Catalogs** folder to another disk. The procedure below assumes that the `C:\Program Files (x86)\NNT Log Tracker Suite\catalogs` folder (the default location for catalog files) is to be moved to the `E:\NNT Log Tracker Suite\catalogs` folder to free up disk space on the `C:` drive of the system.

> IMPORTANT: Before proceeding with the steps below, please ensure that you take a backup/snapshot of the server hosting Netwrix Change Tracker.

1. Copy the `C:\Program Files (x86)\NNT Log Tracker Suite\catalogs` folder to the `E:\NNT Log Tracker Suite\catalogs` folder in its entirety. Note that this operation can take an hour or more to accomplish, depending on the number of indexes on the system.

2. Once the copy operation is finished, stop the **CorreLog Framework** service with the Windows Service Manager (or via the `net stop correlog` command at a command prompt).

3. Rename the `C:\Program Files (x86)\NNT Log Tracker Suite\catalogs` folder to some other name, such as `C:\Program Files (x86)\NNT Log Tracker Suite\catalogs.delete`.

   > NOTE: if this operation fails, you have the **catalogs** folder locked. Make sure you close all windows and command prompts and verify all **CO-** processes have been stopped.

4. Create a hard link in the `C:\Program Files (x86)\NNT Log Tracker Suite` folder to point to the `E:\NNT Log Tracker Suite\catalogs` folder, using the Windows `mklink` command.

   At an administrative command prompt, change working directory to `C:\Program Files (x86)\NNT Log Tracker Suite` and issue the following command:

   ```bat
   mklink /D catalogs E:\NNT Log Tracker Suite\catalogs
   ```

   > NOTE: The above command creates a hard link to the directory. After creating the above link, you can easily verify that the link was made correctly by changing working directories (via the `cd catalogs` command) or by using File Explorer to access the catalogs folder.

5. Restart the **CorreLog Framework** service with the Windows Service Manager (or via the `net start correlog` command at a command prompt.) Verify that the system starts correctly, and all indexed data has been retained. You can check the various index via the **Messages > Catalogs** and **Correlation > Threads** screens of the system. Verify that multiple days worth of data exist for the various catalogs on the system.

6. After verifying the success of the operation in steps 4 and 5 above, delete the `C:\Program Files (x86)\NNT Log Tracker Suite\catalogs.delete` folder renamed on step 3 above.

No other steps are necessary.

Please note that the above procedure assumes that the `E:\` drive has sufficient space to contain the catalogs and that the `E:\` drive is present on the system; please select the correct drive letter.
