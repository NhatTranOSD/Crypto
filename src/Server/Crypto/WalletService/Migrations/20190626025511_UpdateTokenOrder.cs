using Microsoft.EntityFrameworkCore.Migrations;

namespace WalletService.Migrations
{
    public partial class UpdateTokenOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RevertTxHash",
                table: "TokenOrders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RevertTxHash",
                table: "TokenOrders");
        }
    }
}
