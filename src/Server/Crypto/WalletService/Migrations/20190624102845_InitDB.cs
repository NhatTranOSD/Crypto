using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WalletService.Migrations
{
    public partial class InitDB : Migration
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
                    GasLimit = table.Column<decimal>(nullable: false),
                    GasPricesInGwei = table.Column<double>(nullable: false),
                    Decimals = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TokenConfiguration", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Wallets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wallets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WalletCurrencys",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CurrencyType = table.Column<int>(nullable: false),
                    Balance = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    WalletId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WalletCurrencys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WalletCurrencys_Wallets_WalletId",
                        column: x => x.WalletId,
                        principalTable: "Wallets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WalletCurrencys_WalletId",
                table: "WalletCurrencys",
                column: "WalletId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TokenConfiguration");

            migrationBuilder.DropTable(
                name: "WalletCurrencys");

            migrationBuilder.DropTable(
                name: "Wallets");
        }
    }
}
