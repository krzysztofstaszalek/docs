---
description: >-
  Explains how to create a report for a specific time window in Netwrix Change
  Tracker, including how to set query fields, limit results, use match
  expressions, and alternative graph/thread options.
keywords:
  - Netwrix Change Tracker
  - report
  - time window
  - query
  - Graphs
  - Threads
  - Match Expression
  - Query Max Results
  - Start Date
products:
  - logtracker
sidebar_label: Create Report for Specific Time Window
tags: []
title: "Create Report for Specific Time Window"
knowledge_article_id: kA04u0000000Jd5CAE
---

# Create Report for Specific Time Window

## Question

How to create a report for a specific time frame in Netwrix Change Tracker?

## Answer

Refer to the following steps:

1. Navigate to **Reports** > **Query** > **Run Report**.
2. Select the appropriate query file type for your search. E.g., to create a report on user activity, select **Archive**.
3. In the **Start Date** field, you can specify the latest report date. To limit the report scope, you can use the **Span Days** field.
4. To change the amount of max entries in the report, edit the **Query Max Results** field value.
5. The **Match Expression** field allows to specify an expression to report on. E.g., to run a report on user activity, specify the `user:` expression.

Alternatively, you can use **Reports** > **Graphs** to get a visual representation of activity depending on the graph type and parameters set up. When you click a graph bar in the **Graphs** view, a separate **All Messages for Selected Time** view opens to allow you to either browse activity or specify search parameters to run a new search query.

To better organize the search process, you can create a **Thread** via **Correlation** > **Threads**.

## Related articles

- Rolling-Log Fix: ERROR "HubDetails - Crypto error. Has the agent process account changed since the password data was entered?""
- How to delete a device in Netwrix Change Tracker
- How To Turn Off Bulk Email Notifications (Force Change Tracker to send one email for each change instead of compiling into one email with multiple changes)
- Netwrix Change Tracker - Types of Authentication
<!-- Link to deleted changetracker article removed -->
