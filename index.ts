import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Mail, Phone, Building2, Globe, User } from "lucide-react";
import { motion } from "framer-motion";

export default function MiniProjetoReactOM() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Não foi possível obter os dados dos utilizadores.");
      }

      const data = await response.json();
      setUsers(data);
      setSelectedUser(data[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter((user) =>
      [user.name, user.email, user.company?.name, user.website]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized))
    );
  }, [users, query]);

  useEffect(() => {
    if (!filteredUsers.find((user) => user.id === selectedUser?.id)) {
      setSelectedUser(filteredUsers[0] || null);
    }
  }, [filteredUsers, selectedUser]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Painel de Utilizadores
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Mini projeto demonstrativo em React com consumo de API REST, pesquisa, seleção de registos
              e visualização de detalhe. Adequado para portfolio técnico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              React
            </Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              REST API
            </Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              UI Responsiva
            </Badge>
            <Button onClick={fetchUsers} className="rounded-2xl">
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-xl">Lista de Utilizadores</CardTitle>
                  <span className="text-sm text-slate-500">{filteredUsers.length} registos</span>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pesquisar por nome, email, empresa ou website"
                    className="rounded-2xl pl-10"
                  />
                </div>
              </CardHeader>

              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                    Não foram encontrados utilizadores para a pesquisa atual.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.map((user) => {
                      const isActive = selectedUser?.id === user.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={`w-full rounded-2xl border p-4 text-left transition ${
                            isActive
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <p className="font-medium">{user.name}</p>
                              </div>
                              <p className={`mt-2 text-sm ${isActive ? "text-slate-200" : "text-slate-600"}`}>
                                {user.email}
                              </p>
                              <p className={`mt-1 text-sm ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                                {user.company?.name}
                              </p>
                            </div>
                            <Badge
                              variant={isActive ? "secondary" : "outline"}
                              className="rounded-full px-3 py-1"
                            >
                              ID {user.id}
                            </Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Detalhe do Utilizador</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedUser ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-slate-100 p-5">
                      <p className="text-2xl font-semibold text-slate-900">{selectedUser.name}</p>
                      <p className="mt-1 text-sm text-slate-600">Username: {selectedUser.username}</p>
                    </div>

                    <div className="grid gap-3">
                      <InfoRow icon={Mail} label="Email" value={selectedUser.email} />
                      <InfoRow icon={Phone} label="Telefone" value={selectedUser.phone} />
                      <InfoRow icon={Globe} label="Website" value={selectedUser.website} />
                      <InfoRow icon={Building2} label="Empresa" value={selectedUser.company?.name} />
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-800">Morada</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {selectedUser.address?.street}, {selectedUser.address?.suite}
                        <br />
                        {selectedUser.address?.zipcode} {selectedUser.address?.city}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-800">Notas do Projeto</p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                        <li>• Consumo de API REST com fetch e tratamento de erros</li>
                        <li>• Pesquisa em tempo real com filtragem local</li>
                        <li>• Interface responsiva com componentes reutilizáveis</li>
                        <li>• Estrutura adequada para evoluir para CRUD e autenticação</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                    Seleciona um utilizador para ver o detalhe.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
      <div className="rounded-xl bg-slate-100 p-2">
        <Icon className="h-4 w-4 text-slate-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="mt-1 text-sm text-slate-600">{value || "—"}</p>
      </div>
    </div>
  );
}
