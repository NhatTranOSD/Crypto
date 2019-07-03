using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingService.Migrations
{
    public partial class add_Order_field_RefundAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RefundAmount",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefundAmount",
                table: "Orders");
        }
    }
}
