using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingService.Migrations
{
    public partial class UpdateOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefundTxHash",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefundTxHash",
                table: "Orders");
        }
    }
}
