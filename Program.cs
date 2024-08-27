// //Program.cs
// //Program.cs
// //Program.cs

// using Microsoft.EntityFrameworkCore;
// using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
// using Backend.Data;
// using Microsoft.AspNetCore.Antiforgery;

// //var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// var builder = WebApplication.CreateBuilder(args);

// // Configure CORS policy
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll",
//         builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// });


// // Configure DbContext with MySQL
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 33)))); // Specify your MySQL version

// // Add authorization services
// builder.Services.AddAuthorization();
// builder.Services.AddControllers();

// var app = builder.Build();

// app.UseCors("AllowAll");


// // Add authorization middleware
// app.UseAuthorization();

// app.MapControllers();
// app.MapGet("/", ()=> "hELLO, wORLD");

// app.Run();


using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://azureinfoempleados-ghb2ctbbhfb6escc.eastus-01.azurewebsites.net")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Configure DbContext with MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 33)))); // Specify your MySQL version

// Add authorization services
builder.Services.AddAuthorization();
builder.Services.AddControllers();

// Configure static files
builder.Services.AddDirectoryBrowser(); // Optional, if you want directory browsing support

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCors("AllowSpecificOrigin"); // Use the correct CORS policy name

app.UseHttpsRedirection();
app.UseStaticFiles(); // This will serve files from wwwroot by default

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// Fallback route for SPA
app.MapFallbackToFile("index.html"); // Ensure this file exists in your wwwroot directory

app.Run();
