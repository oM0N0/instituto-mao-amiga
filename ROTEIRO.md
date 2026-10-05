# Roteiro de Demonstração — Instituto Mão Amiga (até 3 min)

## 1. Tela inicial — Lista de pontos de coleta (30s)
- Mostrar a lista com os 7 pontos de coleta.
- Tocar em um ponto e mostrar o detalhe (endereço, horário, o que recebe/distribui).
- Voltar para a lista.

## 2. Cadastrar uma doação (40s)
- Tocar em "+ Nova Doação".
- Preencher: tipo "Arroz", quantidade "20", destino "Mercado Central".
- Mostrar a validação: apagar a quantidade e digitar uma letra — erro aparece.
- Corrigir e tocar em "Cadastrar Doação" — alerta de sucesso.

## 3. Histórico de doações (30s)
- Tocar em "Histórico de Doações".
- Mostrar o resumo no topo com os totais por tipo.
- Mostrar a lista de doações registradas.

## 4. Filtrar doações (20s)
- Digitar "arroz" no campo de busca — só doações de arroz aparecem.
- Digitar algo que não existe — mensagem "Nenhuma doação encontrada".
- Apagar o texto — todas voltam.

## 5. Editar uma doação (20s)
- Tocar numa doação para abrir o detalhe.
- Tocar em "Editar Doação".
- Mudar a quantidade e salvar.
- Mostrar que o detalhe e o histórico atualizaram.

## 6. Excluir uma doação (20s)
- No detalhe, tocar em "Excluir Doação".
- Cancelar primeiro — nada acontece.
- Excluir de verdade — volta ao histórico e a doação sumiu.

## 7. Persistência (20s)
- Fechar o app completamente.
- Reabrir e mostrar que as doações continuam salvas.

## Decisão técnica para explicar
Os totais do resumo são calculados a cada renderização, e não salvos no AsyncStorage, porque:
- Evita inconsistência entre os totais salvos e as doações reais.
- Qualquer cadastro, edição ou exclusão atualiza o resumo automaticamente.
- O cálculo é leve (apenas um loop no array), sem impacto de performance.