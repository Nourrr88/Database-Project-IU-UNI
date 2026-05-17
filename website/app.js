const roles = [
  { id: 1, name: "Student", limit: 2048, devices: 2 },
  { id: 2, name: "Staff", limit: 4096, devices: 3 },
  { id: 3, name: "Admin", limit: 8192, devices: 5 },
  { id: 4, name: "Guest", limit: 512, devices: 1 }
];

const networks = [
  { id: 1, ssid: "FCI-Students", vlan: 10, subnet: "10.10.10.0/24", security: "WPA2-Enterprise" },
  { id: 2, ssid: "FCI-Staff", vlan: 20, subnet: "10.10.20.0/24", security: "WPA2-Enterprise" },
  { id: 3, ssid: "FCI-Guest", vlan: 30, subnet: "10.10.30.0/24", security: "Captive Portal" }
];

const users = [
  { id: 1, universityId: "24030146", name: "Noureldin Amr Mohamed", email: "24030146@fci.edu.eg", status: "Active", roleId: 1 },
  { id: 2, universityId: "24030026", name: "Rahma Mohsen Abdelrahman", email: "24030026@fci.edu.eg", status: "Active", roleId: 1 },
  { id: 3, universityId: "24030171", name: "Ahmed Mahmoud Khalaf", email: "24030171@fci.edu.eg", status: "Active", roleId: 1 },
  { id: 4, universityId: "STAFF1001", name: "Mona Hassan", email: "mona.hassan@fci.edu.eg", status: "Active", roleId: 2 },
  { id: 5, universityId: "GUEST9001", name: "Temporary Guest", email: "guest9001@fci.edu.eg", status: "Suspended", roleId: 4 }
];

let devices = [
  { id: 1, userId: 1, name: "Noureldin Laptop", mac: "A4:5E:60:12:9B:10", type: "Laptop", trusted: true },
  { id: 2, userId: 1, name: "Noureldin Phone", mac: "88:2A:5E:77:11:23", type: "Mobile", trusted: true },
  { id: 3, userId: 2, name: "Rahma Phone", mac: "0C:8B:FD:AA:09:44", type: "Mobile", trusted: true },
  { id: 4, userId: 3, name: "Ahmed Laptop", mac: "90:E2:BA:30:CD:61", type: "Laptop", trusted: true },
  { id: 5, userId: 4, name: "Staff Tablet", mac: "D0:37:45:81:21:19", type: "Tablet", trusted: true },
  { id: 6, userId: 5, name: "Guest Phone", mac: "14:7D:DA:99:44:18", type: "Mobile", trusted: false }
];

const accessPoints = [
  { id: 1, networkId: 1, name: "AP-Library-01", location: "Main Library - First Floor", ip: "10.10.10.11", status: "Online" },
  { id: 2, networkId: 1, name: "AP-Lab-02", location: "Computer Lab 2", ip: "10.10.10.12", status: "Online" },
  { id: 3, networkId: 2, name: "AP-Staff-01", location: "Staff Offices", ip: "10.10.20.10", status: "Online" },
  { id: 4, networkId: 3, name: "AP-Hall-Guest", location: "Main Hall", ip: "10.10.30.5", status: "Maintenance" }
];

const sessions = [
  { id: 1, userId: 1, deviceId: 1, apId: 1, login: "09:00", duration: 90, usage: 275.25, status: "Allowed", reason: "" },
  { id: 2, userId: 2, deviceId: 3, apId: 2, login: "10:15", duration: 45, usage: 180.45, status: "Allowed", reason: "" },
  { id: 3, userId: 3, deviceId: 4, apId: 2, login: "11:00", duration: 65, usage: 137.15, status: "Allowed", reason: "" },
  { id: 4, userId: 4, deviceId: 5, apId: 3, login: "12:00", duration: 60, usage: 106.9, status: "Allowed", reason: "" },
  { id: 5, userId: 5, deviceId: 6, apId: 4, login: "12:35", duration: 0, usage: 0, status: "Denied", reason: "Account is suspended" }
];

const usageLogs = [
  { id: 1, sessionId: 1, download: 412.25, upload: 154.5 },
  { id: 2, sessionId: 2, download: 888.15, upload: 185.3 },
  { id: 3, sessionId: 3, download: 95.4, upload: 41.75 },
  { id: 4, sessionId: 4, download: 79.6, upload: 27.3 }
];

const recommendations = [
  { id: 1, roleId: 1, networkId: 1, action: "Connect Student to FCI-Students", reason: "Best network for normal student traffic" },
  { id: 2, roleId: 2, networkId: 2, action: "Connect Staff to FCI-Staff", reason: "Staff needs protected access" },
  { id: 3, roleId: 3, networkId: 2, action: "Connect Admin to FCI-Staff", reason: "Admin uses secure internal network" },
  { id: 4, roleId: 4, networkId: 3, action: "Connect Guest to FCI-Guest", reason: "Guest should be isolated from internal network" }
];

const adminActions = [
  "Register Device: approved trusted laptop",
  "Suspend User: guest access expired",
  "Maintenance Mode: guest AP under maintenance",
  "Recommendation Update: student route optimized to least loaded AP"
];

const requirements = [
  "Store WiFi networks, roles, users, devices, access points, sessions, usage logs, recommendations, and admin actions.",
  "Allow only active users with trusted devices to create allowed sessions.",
  "Track per-session bandwidth usage for analysis and reports.",
  "Provide a recommendation that suggests the correct SSID for each role."
];

const physicalSchema = [
  ["WiFiNetwork", "PK Network_Id, SSID, VLAN_Id, Subnet_CIDR, Security_Type"],
  ["Role", "PK Role_Id, Role_Name, Max_Daily_Data_MB, Max_Devices"],
  ["User", "PK User_Id, University_Id, Full_Name, Email, Status, FK Role_Id"],
  ["Device", "PK Device_Id, Device_Name, MAC_Address, Device_Type, Is_Trusted, FK User_Id"],
  ["AccessPoint", "PK AccessPoint_Id, AP_Name, IP_Address, Location, Status, FK Network_Id"],
  ["Session_Log", "PK Session_Id, Login_Time, Logout_Time, Auth_Status, FK User_Id, FK Device_Id, FK AccessPoint_Id"],
  ["Usage_Log", "PK Log_Id, Download_MB, Upload_MB, Log_Time, FK Session_Id"],
  ["Recommendation", "PK Recommendation_Id, Recommended_Action, Reason_Text, FK Role_Id, FK Network_Id"],
  ["Admin_Action", "PK Action_Id, Action_Type, Action_Time, Notes, FK User_Id"]
];

const entities = [
  { name: "WiFiNetwork", cols: ["Network_Id PK", "SSID UK", "VLAN_Id UK", "Subnet_CIDR", "Security_Type"] },
  { name: "Role", cols: ["Role_Id PK", "Role_Name UK", "Max_Daily_Data_MB", "Max_Devices"] },
  { name: "User", cols: ["User_Id PK", "University_Id UK", "Full_Name", "Email UK", "Status", "Role_Id FK"] },
  { name: "Device", cols: ["Device_Id PK", "Device_Name", "MAC_Address UK", "Device_Type", "Is_Trusted", "User_Id FK"] },
  { name: "AccessPoint", cols: ["AccessPoint_Id PK", "AP_Name", "IP_Address UK", "Location", "Status", "Network_Id FK"] },
  { name: "Session_Log", cols: ["Session_Id PK", "Login_Time", "Logout_Time", "Auth_Status", "User_Id FK", "Device_Id FK", "AccessPoint_Id FK"] },
  { name: "Usage_Log", cols: ["Log_Id PK", "Download_MB", "Upload_MB", "Log_Time", "Session_Id FK"] },
  { name: "Recommendation", cols: ["Recommendation_Id PK", "Recommended_Action", "Reason_Text", "Role_Id FK", "Network_Id FK"] },
  { name: "Admin_Action", cols: ["Action_Id PK", "Action_Type", "Action_Time", "Notes", "User_Id FK"] }
];

const sqlExamples = {
  "Create User Table": `CREATE TABLE [User] (
    User_Id INT PRIMARY KEY,
    University_Id VARCHAR(20) NOT NULL UNIQUE,
    Full_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Status VARCHAR(20) DEFAULT 'Active',
    Role_Id INT
);`,
  "Create Session Table": `CREATE TABLE Session_Log (
    Session_Id INT PRIMARY KEY,
    Login_Time DATETIME DEFAULT GETDATE(),
    Logout_Time DATETIME,
    Auth_Status VARCHAR(20) NOT NULL,
    User_Id INT,
    Device_Id INT,
    AccessPoint_Id INT
);`,
  "Recommendation View": `CREATE VIEW Recommendation_View AS
SELECT U.Full_Name , R.Role_Name , W.SSID , RC.Recommended_Action
FROM [User] U , Role R , WiFiNetwork W , Recommendation RC
WHERE U.Role_Id = R.Role_Id
AND RC.Role_Id = R.Role_Id
AND RC.Network_Id = W.Network_Id;`,
  "Show Active Sessions Procedure": `CREATE PROCEDURE ShowActiveSessions
AS
BEGIN
    SELECT *
    FROM Session_Log
    WHERE Auth_Status = 'Allowed';
END;`
};

function byId(id) {
  return document.getElementById(id);
}

function findUser(id) {
  return users.find((user) => user.id === id);
}

function findDevice(id) {
  return devices.find((device) => device.id === id);
}

function findAp(id) {
  return accessPoints.find((ap) => ap.id === id);
}

function findRoleById(id) {
  return roles.find((role) => role.id === id);
}

function findRoleByName(name) {
  return roles.find((role) => role.name === name);
}

function findNetwork(id) {
  return networks.find((network) => network.id === id);
}

function getUserRole(user) {
  return findRoleById(user.roleId);
}

function badgeClass(value) {
  return String(value).toLowerCase().replaceAll(" ", "-");
}

function matchesSearch(text) {
  const query = byId("globalSearch").value.trim().toLowerCase();
  return !query || text.toLowerCase().includes(query);
}

function formatDuration(minutes) {
  if (minutes === 0) return "0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function emptyRow(columns) {
  return `<tr><td colspan="${columns}">No matching records found.</td></tr>`;
}

function simpleRow(text) {
  return `<div class="list-row"><span>${text}</span></div>`;
}

function getRecommendationForUser(userId) {
  const user = findUser(userId);
  const role = getUserRole(user);
  const plan = recommendations.find((item) => item.roleId === role.id);
  const network = findNetwork(plan.networkId);
  const ownedDevices = devices.filter((device) => device.userId === user.id);
  const trustedDevices = ownedDevices.filter((device) => device.trusted);

  if (user.status !== "Active") {
    return {
      state: "denied",
      title: "Access should remain blocked",
      network: network.ssid,
      action: "Reactivate the account before any new WiFi session.",
      reason: "The SQL constraint and logic allow only active users to continue."
    };
  }

  if (trustedDevices.length === 0) {
    return {
      state: "maintenance",
      title: "Trusted device is required first",
      network: network.ssid,
      action: "Register or unblock a trusted device before creating a session.",
      reason: "The project uses device trust as part of secure session creation."
    };
  }

  return {
    state: "allowed",
    title: `${network.ssid} is the correct match`,
    network: network.ssid,
    action: plan.action,
    reason: plan.reason
  };
}

function renderMetrics() {
  byId("activeSessions").textContent = sessions.filter((session) => session.status === "Allowed").length;
  byId("deviceCount").textContent = devices.length;
  byId("usageToday").textContent = `${usageLogs.reduce((sum, log) => sum + log.download + log.upload, 0).toFixed(1)} MB`;
}

function renderSessionsTable() {
  const rows = sessions
    .filter((session) => session.status === "Allowed")
    .filter((session) => {
      const user = findUser(session.userId);
      const device = findDevice(session.deviceId);
      const ap = findAp(session.apId);
      return matchesSearch(`${user.name} ${device.name} ${ap.name}`);
    })
    .map((session) => {
      const user = findUser(session.userId);
      const device = findDevice(session.deviceId);
      const ap = findAp(session.apId);
      return `
        <tr>
          <td>${user.name}</td>
          <td>${device.name}</td>
          <td>${ap.name}</td>
          <td>${formatDuration(session.duration)}</td>
          <td>${session.usage.toFixed(2)} MB</td>
          <td><span class="badge ${badgeClass(session.status)}">${session.status}</span></td>
        </tr>
      `;
    }).join("");
  byId("sessionsTable").innerHTML = rows || emptyRow(6);
}

function renderUsersTable() {
  const roleFilter = byId("roleFilter").value;
  const rows = users
    .filter((user) => roleFilter === "All" || getUserRole(user).name === roleFilter)
    .filter((user) => matchesSearch(`${user.name} ${user.email} ${user.universityId}`))
    .map((user) => {
      const role = getUserRole(user);
      return `
        <tr>
          <td>${user.universityId}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><span class="badge ${badgeClass(role.name)}">${role.name}</span></td>
          <td><span class="badge ${badgeClass(user.status)}">${user.status}</span></td>
          <td>${role.limit} MB</td>
        </tr>
      `;
    }).join("");
  byId("usersTable").innerHTML = rows || emptyRow(6);
}

function renderDevicesTable() {
  const rows = devices
    .filter((device) => {
      const user = findUser(device.userId);
      return matchesSearch(`${user.name} ${device.name} ${device.mac} ${device.type}`);
    })
    .map((device) => {
      const user = findUser(device.userId);
      return `
        <tr>
          <td>${user.name}</td>
          <td>${device.name}</td>
          <td>${device.mac}</td>
          <td>${device.type}</td>
          <td><span class="badge ${device.trusted ? "allowed" : "denied"}">${device.trusted ? "Trusted" : "Blocked"}</span></td>
        </tr>
      `;
    }).join("");
  byId("devicesTable").innerHTML = rows || emptyRow(5);
}

function renderHistoryTable() {
  const statusFilter = byId("statusFilter").value;
  const rows = sessions
    .filter((session) => statusFilter === "All" || session.status === statusFilter)
    .filter((session) => {
      const user = findUser(session.userId);
      const device = findDevice(session.deviceId);
      const ap = findAp(session.apId);
      return matchesSearch(`${session.id} ${user.name} ${device.name} ${ap.name} ${session.status}`);
    })
    .map((session) => {
      const user = findUser(session.userId);
      const device = findDevice(session.deviceId);
      const ap = findAp(session.apId);
      return `
        <tr>
          <td>${session.id}</td>
          <td>${user.name}</td>
          <td>${device.name}</td>
          <td>${ap.name}</td>
          <td>${session.login}</td>
          <td>${session.usage.toFixed(2)} MB</td>
          <td><span class="badge ${badgeClass(session.status)}">${session.status}</span></td>
        </tr>
      `;
    }).join("");
  byId("historyTable").innerHTML = rows || emptyRow(7);
}

function renderRoleLimits() {
  byId("roleLimitList").innerHTML = roles.map((role) => {
    const width = Math.min(100, (role.limit / 8192) * 100);
    return `
      <div class="list-row">
        <div class="row-top">
          <strong>${role.name}</strong>
          <span>${role.limit} MB/day</span>
        </div>
        <div class="bar"><span style="width:${width}%"></span></div>
        <small>${role.devices} device(s) maximum</small>
      </div>
    `;
  }).join("");
}

function renderDenied() {
  byId("deniedList").innerHTML = sessions
    .filter((session) => session.status === "Denied")
    .map((session) => {
      const user = findUser(session.userId);
      const device = findDevice(session.deviceId);
      return `
        <div class="list-row">
          <strong>${user.name}</strong>
          <span>${device.name}</span>
          <span class="badge denied">${session.reason}</span>
        </div>
      `;
    }).join("");
}

function renderRecommendationSelector() {
  byId("recommendationUser").innerHTML = users
    .map((user) => `<option value="${user.id}">${user.universityId} - ${user.name}</option>`)
    .join("");
}

function renderRecommendationCard() {
  const userId = Number(byId("recommendationUser").value || users[0].id);
  const user = findUser(userId);
  const role = getUserRole(user);
  const recommendation = getRecommendationForUser(userId);

  byId("recommendationCard").innerHTML = `
    <div class="recommendation-head">
      <div>
        <p class="eyebrow">Selected User</p>
        <h3>${user.name}</h3>
      </div>
      <span class="badge ${recommendation.state}">${role.name}</span>
    </div>
    <p class="recommendation-title">${recommendation.title}</p>
    <p>${recommendation.action}</p>
    <div class="recommendation-meta">
      <div class="list-row">
        <strong>Suggested SSID</strong>
        <span>${recommendation.network}</span>
      </div>
      <div class="list-row">
        <strong>Reason</strong>
        <span>${recommendation.reason}</span>
      </div>
    </div>
  `;
}

function renderDatabaseLab() {
  byId("dbObjectGrid").innerHTML = [
    { label: "Tables", count: 9, detail: "WiFiNetwork, Role, User, Device, AccessPoint, Session_Log, Usage_Log, Recommendation, Admin_Action" },
    { label: "Relationships", count: 9, detail: "Every foreign key shown in the final schema and draw.io mapping" },
    { label: "Views", count: 2, detail: "Active_Users_View and Recommendation_View" },
    { label: "Procedures", count: 1, detail: "ShowActiveSessions" },
    { label: "Recommendations", count: 4, detail: "Role-based network guidance for Student, Staff, Admin, and Guest" },
    { label: "Checks", count: 3, detail: "Status, Device_Type, and Auth_Status are restricted by CHECK constraints" },
    { label: "PK / FK", count: 18, detail: "Primary and foreign keys match the SQL file and schema diagram" },
    { label: "Lab Style", count: 1, detail: "Website now mirrors the same final DB model used in the SQL submission" }
  ].map((object) => `
    <article class="db-object">
      <strong>${object.count}</strong>
      <h3>${object.label}</h3>
      <p class="muted-text">${object.detail}</p>
    </article>
  `).join("");

  byId("requirementList").innerHTML = requirements.map(simpleRow).join("");
  byId("relationshipList").innerHTML = [
    "Role.Role_Id -> User.Role_Id",
    "User.User_Id -> Device.User_Id",
    "WiFiNetwork.Network_Id -> AccessPoint.Network_Id",
    "User.User_Id -> Session_Log.User_Id",
    "Device.Device_Id -> Session_Log.Device_Id",
    "AccessPoint.AccessPoint_Id -> Session_Log.AccessPoint_Id",
    "Session_Log.Session_Id -> Usage_Log.Session_Id",
    "Role.Role_Id -> Recommendation.Role_Id",
    "WiFiNetwork.Network_Id -> Recommendation.Network_Id",
    "User.User_Id -> Admin_Action.User_Id"
  ].map(simpleRow).join("");

  byId("erdBoard").innerHTML = entities.map((entity) => `
    <article class="entity">
      <h3>${entity.name}</h3>
      <ul>${entity.cols.map((col) => `<li>${col}</li>`).join("")}</ul>
    </article>
  `).join("");

  byId("schemaCards").innerHTML = physicalSchema.map((row) => `
    <article class="schema-card">
      <div class="schema-head">
        <h3>${row[0]}</h3>
        <span class="badge neutral">Mapped</span>
      </div>
      <div class="list-row">
        <span>${row[1]}</span>
      </div>
    </article>
  `).join("");

  byId("constraintList").innerHTML = [
    "PK fields identify each row uniquely in every table.",
    "FK fields connect Role, User, Device, AccessPoint, Session_Log, Usage_Log, Recommendation, and Admin_Action.",
    "UNIQUE is used on SSID, VLAN_Id, Role_Name, University_Id, Email, MAC_Address, AP_Name, and IP_Address.",
    "CHECK constraints restrict user status, device type, and session status."
  ].map(simpleRow).join("");

  byId("procedureList").innerHTML = [
    "ShowActiveSessions returns sessions where Auth_Status = 'Allowed'."
  ].map(simpleRow).join("");

  byId("triggerList").innerHTML = [
    "No trigger is used in the final SQL file. Logic was simplified to match the lab style."
  ].map(simpleRow).join("");

  byId("viewList").innerHTML = [
    "Active_Users_View",
    "Recommendation_View"
  ].map(simpleRow).join("");
}

function renderSqlSelector() {
  const selector = byId("sqlSelector");
  selector.innerHTML = Object.keys(sqlExamples).map((key) => `<option>${key}</option>`).join("");
  byId("sqlPreview").textContent = sqlExamples[selector.value];
  selector.addEventListener("change", () => {
    byId("sqlPreview").textContent = sqlExamples[selector.value];
  });
}

function renderNetwork() {
  byId("topologyBoard").innerHTML = networks.map((network) => `
    <article class="topology-node">
      <h3>${network.ssid}</h3>
      <p>VLAN ${network.vlan}</p>
      <p>${network.subnet}</p>
      <small>${network.security}</small>
    </article>
  `).join("");

  byId("apList").innerHTML = accessPoints.map((ap) => {
    const network = findNetwork(ap.networkId);
    return `
      <article class="ap-card">
        <div class="row-top">
          <h3>${ap.name}</h3>
          <span class="badge ${badgeClass(ap.status)}">${ap.status}</span>
        </div>
        <p>${ap.location}</p>
        <div class="row-top">
          <span>${network.ssid}</span>
          <strong>${ap.ip}</strong>
        </div>
      </article>
    `;
  }).join("");
}

function renderReports() {
  const userUsage = users
    .map((user) => ({
      user,
      usage: sessions.filter((session) => session.userId === user.id).reduce((sum, session) => sum + session.usage, 0)
    }))
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 4);

  byId("usageList").innerHTML = userUsage.map((item) => {
    const role = getUserRole(item.user);
    const width = Math.min(100, (item.usage / role.limit) * 100);
    return `
      <div class="list-row">
        <div class="row-top">
          <strong>${item.user.name}</strong>
          <span>${item.usage.toFixed(2)} MB</span>
        </div>
        <div class="bar"><span style="width:${width}%"></span></div>
        <small>${role.name} limit: ${role.limit} MB</small>
      </div>
    `;
  }).join("");

  byId("apLoadList").innerHTML = accessPoints.map((ap) => {
    const apSessions = sessions.filter((session) => session.apId === ap.id);
    return `
      <div class="list-row">
        <div class="row-top">
          <strong>${ap.name}</strong>
          <span>${apSessions.length} sessions</span>
        </div>
        <small>${ap.location}</small>
      </div>
    `;
  }).join("");

  byId("auditList").innerHTML = adminActions.map(simpleRow).join("");
}

function renderDeviceOwnerOptions() {
  byId("deviceOwner").innerHTML = users.map((user) => `<option value="${user.id}">${user.universityId} - ${user.name}</option>`).join("");
}

function setView(viewName) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.viewPanel !== viewName);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === viewName);
  });
  const activeLink = document.querySelector(`.nav-link[data-view="${viewName}"]`);
  byId("pageTitle").textContent = activeLink ? activeLink.textContent : "Smart Campus WiFi Management";
}

function wireEvents() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => setView(link.dataset.view));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.jump));
  });

  byId("globalSearch").addEventListener("input", renderAll);
  byId("roleFilter").addEventListener("change", renderUsersTable);
  byId("statusFilter").addEventListener("change", renderHistoryTable);
  byId("refreshBtn").addEventListener("click", renderAll);
  byId("recommendationUser").addEventListener("change", renderRecommendationCard);

  const dialog = byId("deviceDialog");
  const openDialog = () => dialog.showModal();
  byId("openAddDevice").addEventListener("click", openDialog);
  byId("openAddDeviceAlt").addEventListener("click", openDialog);
  byId("closeDeviceDialog").addEventListener("click", () => dialog.close());

  byId("deviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = Number(data.get("userId"));
    const mac = String(data.get("mac")).toUpperCase();
    const user = findUser(userId);
    const role = getUserRole(user);

    if (devices.some((device) => device.mac === mac)) {
      byId("formMessage").textContent = "MAC address already exists. UNIQUE constraint would reject this insert.";
      return;
    }

    if (devices.filter((device) => device.userId === userId).length >= role.devices) {
      byId("formMessage").textContent = "Role device limit reached. Remove an old device or change the user role first.";
      return;
    }

    devices = [
      ...devices,
      {
        id: devices.length + 1,
        userId,
        name: data.get("deviceName"),
        mac,
        type: data.get("type"),
        trusted: true
      }
    ];

    byId("formMessage").textContent = "Trusted device inserted successfully according to the final project rules.";
    renderAll();
  });
}

function renderAll() {
  renderMetrics();
  renderSessionsTable();
  renderUsersTable();
  renderDevicesTable();
  renderHistoryTable();
  renderRoleLimits();
  renderDenied();
  renderRecommendationCard();
  renderNetwork();
  renderReports();
}

renderDeviceOwnerOptions();
renderRecommendationSelector();
renderDatabaseLab();
renderSqlSelector();
renderAll();
wireEvents();
setView("overview");
