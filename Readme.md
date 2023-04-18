![blumeabanner_static](https://user-images.githubusercontent.com/56465610/215419028-c5b3987d-4e9d-4cbb-931f-438a33ce07d4.png)

# Blumea Serverless

Blumea's React.js client is powered by this Serverless node application that provides standard utilities and scalability without infrastructure management.

The application is designed to incorporate feedback and mail services, improving user engagement. The Serverless architecture enables rapid development and deployment, reduces operational overhead, and is cost-effective.


## 🏗️ Deployments
**Please note that all APIs prefixed with /api require an API key.**
* **[Prod Deployment](https://blumea-serverless.vercel.app/ "Blumea Serverless Vercel")**
* **[Dev Deployment](https://blumea-server-1.herokuapp.com/ "Blumea Serverless-Dev-Heroku")**
* **[Prod Deployment 1 - Mail Service Enabled](https://blumea-serverless.onrender.com "Blumea Serverless v2 Render")**
* **[Prod Deployment 2 - Mail Service Enabled](https://blumea-serverless-v2.onrender.com "Blumea Serverless v2 Render")**


---
## ❔ API Accessibility
All request must contain **`x-api-key`** header to access the protected endpoints. 
 
**Services**
* **/api/home** - Enlists exposed APIs.
  
* **/api/mail** - Blumea Mail Service.
    * POST: **/api/mail/generate** - Trigger email verification for a client.
    * GET: **/api/mail/verify/:token** - Verify client email - triggered through gmail.

* **/api/feedback** - Users with verified email to submit feedback.

**Demo Section Utility**
* **/api/`filter_name`/create?item=** - In house demo for item insertion on a filter instance.

* **/api/`filter_name`/search?item=** - In house demo for item look up on a filter instance.

* **Sample**
  ```bash
    curl https://blumea-serverless.vercel.app/api/classical/search?item=user17
    -H "x-api-key: ExampleKeyQmx1bWVhIFNlcnZlcmxlc3M="
  ```
* **Options for the filter:**
  * **/api/classical**
  * **/api/counting**
  * **/api/partitioned**
  * `wip` **/api/cuckoo**
  * `wip` **/api/scalable**

---
## 📦 Application Details
#### **License**
**[MIT License](https://github.com/Blumea/Blumea-Serverless/blob/main/LICENSE "View License")**

#### **Author**
**[Github.com/Blumea](https://github.com/Blumea "Open GitHub Organization")**
#### **Maintainer**
**[Akash Chouhan](github.com/akashchouhan16 "akashchouhan16")**

