using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingService.Migrations
{
    public partial class InitDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    BuyerId = table.Column<Guid>(nullable: false),
                    BuyerEmail = table.Column<string>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false),
                    ProductName = table.Column<string>(nullable: false),
                    TotalProducts = table.Column<int>(nullable: false),
                    TotalPayment = table.Column<decimal>(nullable: false),
                    Currency = table.Column<string>(nullable: false),
                    TxHash = table.Column<string>(nullable: false),
                    RefundTxHash = table.Column<string>(nullable: true),
                    OrderStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Stock = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Currency = table.Column<string>(nullable: true),
                    PictureUri = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
