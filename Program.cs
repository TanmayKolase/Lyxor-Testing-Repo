using InvoiceManagementAPI.Data;
using InvoiceManagementAPI.Repositories;
using InvoiceManagementAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Hardcoded connection string
// No exception middleware

// Add services to the container.
builder.Services.AddControllers();

// Hardcoded connection string - should be in appsettings.json or environment variables
var connectionString = "Server=localhost;Database=InvoiceDB;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Register services
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// No exception middleware
// No global error handler

app.Run();

