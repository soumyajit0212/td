<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>Mrittika Event Management - Mappings</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bnsNew.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>html,body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}</style>
</head>
<body class="w3-light-grey">

<!-- Top container -->
<div class="w3-bar w3-top w3-red w3-large" style="z-index:4">
    <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i> Menu</button>
    <span class="w3-bar-item w3-right">Mappings</span>
</div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
    <div class="w3-container">
        <h5>Menu</h5>
    </div>
    <div class="w3-bar-block">
        <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i> Close Menu</a>
        <a href="${pageContext.request.contextPath}/mappings" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-map fa-fw"></i> Mappings</a>
        <a href="${pageContext.request.contextPath}/mappings/create" class="w3-bar-item w3-button w3-padding"><i class="fa fa-plus fa-fw"></i> Add New</a>
    </div>
</nav>

<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">

    <!-- Header -->
    <header class="w3-container" style="padding-top:22px">
        <h5><b><i class="fa fa-map"></i> Mappings</b></h5>
    </header>

    <div class="w3-panel">
        <div class="w3-row-padding" style="margin:0 -16px">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-red"><th>Map ID</th><th>Guest ID</th><th>Event ID</th><th>Actions</th></tr>
                <c:forEach items="${mappings}" var="mapping">
                    <tr class="w3-hover-green">
                        <td>${mapping.mapId}</td>
                        <td>${mapping.guestId}</td>
                        <td>${mapping.eventId}</td>
                        <td>
                            <a href="${pageContext.request.contextPath}/mappings/edit/${mapping.mapId}" class="w3-button w3-blue"><i class="fa fa-edit"></i></a>
                            <a href="${pageContext.request.contextPath}/mappings/delete/${mapping.mapId}" class="w3-button w3-red"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </div>

    <!-- Footer -->
    <footer class="w3-container w3-padding-16 w3-light-grey">
        <p>Mrittika Event Management System</p>
    </footer>
</div>

<script>
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
</script>

</body>
</html>