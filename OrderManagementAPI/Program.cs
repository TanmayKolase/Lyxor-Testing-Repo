using Microsoft.EntityFrameworkCore;
using OrderManagementAPI.Data;
using OrderManagementAPI.Services;
using System.Text; // Unused import

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Hardcoded connection string - should be in appsettings.json or environment variables
// Missing authentication middleware - no AddAuthentication or AddAuthorization
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("Server=localhost;Database=OrderDB;User Id=sa;Password=Password123!;TrustServerCertificate=True;"));

// Register services
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Missing authentication middleware - no app.UseAuthentication() or app.UseAuthorization()

app.MapControllers();

app.Run();

