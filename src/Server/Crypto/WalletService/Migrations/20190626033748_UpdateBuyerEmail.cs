using Microsoft.EntityFrameworkCore.Migrations;

namespace WalletService.Migrations
{
    public partial class UpdateBuyerEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BuyerEmail",
                table: "TokenOrders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuyerEmail",
                table: "TokenOrders");
        }
    }
}
