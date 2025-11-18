---
description: >-
  Troubleshooting guide for resolving RPC server unavailable connection issues in Netwrix Auditor, including network, antivirus, and resource considerations.
keywords:
  - Netwrix Auditor
  - RPC server unavailable
  - 0x800706BA
  - compression service
  - connection issues
products:
  - auditor
sidebar_label: Troubleshooting Connection Issues - RPC Server Unavailable
tags: []
title: "Troubleshooting Connection Issues for the error 'Connection failed: 0x800706BA The RPC server is unavailable'"
knowledge_article_id:
---

# Troubleshooting Connection Issues for the error "Connection failed: 0x800706BA The RPC server is unavailable"

> **IMPORTANT:** This error, especially when encountered infrequently, does not result in audit data loss. The collector can continue gathering data from where it was last interrupted. It is recommended to verify the data's timeliness in reports to assess whether this impacts the timely delivery of audit data by the collector.

## Overview

This error occurs when the Netwrix Auditor collector fails to establish or maintain a connection with the RPC server. Multiple factors can contribute to this issue, including network instability, antivirus interference, or insufficient system resources. The following sections provide troubleshooting steps to identify and resolve the root cause.

## Instructions

### 1. Connection Dropping with Compression Service During Data Collection

When collecting data from the Target Audited Server, it's vital to maintain a stable and reliable connection with the Compression service. However, sometimes issues may arise when this connection drops. This can often be attributed to network instability, which disrupts proper data transmission. In such cases, the focus should be on addressing the underlying causes of network instability. This may involve inspecting and configuring network equipment to ensure a consistent and robust connection, thereby allowing the data collection process to complete without interruptions.

### 2. Unstable Connection During Large-Scale Audits

When conducting large-scale audits, maintaining a stable connection is critically important. An unstable connection can lead to interruptions, making it challenging or even impossible to carry out the audit in its entirety. An effective strategy for resolving this issue is to break down the initially large audit scope into smaller, more manageable parts. For instance, instead of using the entire Target Audited Server with all shares as an item, it is better to add shares of the Target Audited Server individually as separate items. This approach reduces network load and minimizes the risks associated with connection loss. Segmenting the audit allows for phased execution, contributing to more successful completion of each phase and, ultimately, the entire audit.

> **NOTE:** This recommendation pertains to critically important audit objects, not to the entire audited scope. For example, if the entire file server is added to the audit collection, but auditing multiple shared folders on this server isn't necessary, it's recommended to exclude these folders from collection using "excludes." This way, the collector will gather only what is required for auditing, dedicating all its resources to this task.

> **NOTE:** It also makes sense to use the RET to calculate your scope and estimate the necessary server resources: [Resource Estimation Tool](https://releases.netwrix.com/products/auditor/10.7/auditor-resource-estimation-tool-1.2.39.zip)

### 3. Antivirus Interference on NA-Server and/or Target Audited Server with Netwrix Auditor and Compression Service

Antivirus programs on both the NA-Server and the Target Audited Server are vital for protecting data and systems from malicious threats. However, they can sometimes interfere with the proper functioning of Netwrix Auditor. This can occur for several reasons:

* **Connection Blocking:** Antivirus programs may interpret some legitimate network connections as potential threats, resulting in their blockage. This can disrupt the interaction between Netwrix Auditor and/or Compression service.
* **Traffic Scanning:** The process of scanning incoming and outgoing traffic can slow down data transmission, affecting Netwrix Auditor's performance. The antivirus may delay data packets, suspecting potential threats.
* **False Positives:** Occasionally, antivirus programs may mistakenly identify harmless files or processes as malicious, leading to their isolation or deletion, which can disrupt the operation of Netwrix Auditor and/or Compression service.

To mitigate these issues, it is crucial to add Netwrix Auditor processes and services to the antivirus exclusion list according to the following guidelines:

### Netwrix Auditor Server:

**Paths:**
- `C:\ProgramData\Netwrix Auditor`

  **Note:** If you've previously changed the default location, you can look up the default value in the registry key:
  `HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Netwrix Auditor\DataPathOverride`

**Processes:**
- `NwFileStorageSvc (NwCoreSvc.exe)`

### Target Audited Server (if Compression service is enabled):

**Paths:**
- `C:\Windows\SysWOW64\NwxExeSvc`

**Processes:**
- `NwxExeSvc.exe`
- `NwxFsAgent.exe`
- `NwxEventCollectorAgent.exe`
- `NwxSaclTunerAgent.exe`

For a comprehensive list of antivirus exclusions and additional guidance, refer to [Antivirus Exclusions for Netwrix Auditor](/docs/kb/auditor/antivirus-exclusions-for-netwrix-auditor).

### 4. Insufficient Disk Space on the Target Audited Server's System Disk

When the agent's system disk runs low on free space, it can lead to reduced system performance, inability to install updates, and errors in Compression service operation. Resolving these issues involves freeing up disk space by removing unnecessary files and data, transferring information to other storage devices, or increasing the disk space capacity.

### 5. Insufficient Resources (CPU, RAM) for Compression Service Due to Large Audit Volume

When the Target Audited Server does not have enough free CPU and RAM resources to handle a large audit volume, the Compression service may become overwhelmed, unable to handle the load. This, in turn, can lead to network overload and increase the likelihood of errors during data transmission. To improve the situation, consider segmenting the audit scope, excluding unnecessary scope from the audit, or adding more CPU and RAM resources to the Target Audited Server.

## Related Links

- [Error: 0x800706BA - RPC Server is Unavailable](/docs/kb/auditor/error-0x800706ba-rpc-server-is-unavailable)
