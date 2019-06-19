using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingService.Migrations
{
    public partial class AddTxHash : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TxHash",
                table: "Orders",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TxHash",
                table: "Orders");
        }
    }
}
