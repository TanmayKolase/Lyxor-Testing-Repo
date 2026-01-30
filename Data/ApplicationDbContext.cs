using InvoiceManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InvoiceManagementAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Invoice> Invoices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // No indexes defined
        // No constraints defined
        // No validation rules
        
        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.ToTable("Invoices");
            // Missing primary key configuration
            // Missing indexes
            // Missing constraints
        });
    }
}

