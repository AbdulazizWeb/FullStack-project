FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080}

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["src/FullStack-project_server/FullStack-project_server.csproj", "src/FullStack-project_server/"]
RUN dotnet restore "src/FullStack-project_server/FullStack-project_server.csproj"

COPY . .
WORKDIR "/src/src/FullStack-project_server"
RUN dotnet build "./FullStack-project_server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./FullStack-project_server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FullStack-project_server.dll"]