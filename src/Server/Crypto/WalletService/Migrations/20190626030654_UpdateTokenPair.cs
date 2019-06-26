using Microsoft.EntityFrameworkCore.Migrations;

namespace WalletService.Migrations
{
    public partial class UpdateTokenPair : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PairType",
                table: "TokenOrders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PairType",
                table: "TokenOrders");
        }
    }
}
