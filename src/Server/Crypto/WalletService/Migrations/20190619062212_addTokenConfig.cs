using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WalletService.Migrations
{
    public partial class addTokenConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TokenConfiguration",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TokenName = table.Column<string>(nullable: false),
                    TokenSymbol = table.Column<string>(nullable: false),
                    ContractAddress = table.Column<string>(nullable: false),
                    AdminAddress = table.Column<string>(nullable: false),
                    PriceUSD = table.Column<decimal>(nullable: false),
                    Decimals = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TokenConfiguration", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TokenConfiguration");
        }
    }
}
