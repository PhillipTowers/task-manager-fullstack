import { crearTarea } from "../services/tarea.service";
import { prisma } from "../prisma/client";

jest.mock("../prisma/client", () => ({
  prisma: {
    tarea: {
      create: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe("crearTarea", () => {
  // Validación de título vacío
  it("lanza error si el título está vacío", async () => {
    await expect(
      crearTarea("", undefined, "test-user-id")
    ).rejects.toThrow("El título es obligatorio");
  });

  // Crear tarea normalmente
  it("crea la tarea si el título es válido", async () => {
    (prisma.tarea.count as jest.Mock).mockResolvedValue(0);

    (prisma.tarea.create as jest.Mock).mockResolvedValue({
      id: "test-id-1",
      titulo: "Nueva tarea",
    });

    const resultado = await crearTarea(
      "Nueva tarea",
      undefined,
      "test-user-id"
    );

    expect(resultado.id).toBe("test-id-1");
    expect(prisma.tarea.create).toHaveBeenCalled();
  });

  // Regla de máximo 10 tareas
  describe("regla de máximo 10 tareas", () => {
    it("lanza error si ya hay 10 tareas", async () => {
      // Simula 10 tareas existentes
      (prisma.tarea.count as jest.Mock).mockResolvedValue(10);

      await expect(
        crearTarea(
          "Otra tarea",
          undefined,
          "test-user-id"
        )
      ).rejects.toThrow(
        "No se pueden crear más de 10 tareas"
      );
    });

    it("crea la tarea si hay menos de 10", async () => {
      (prisma.tarea.count as jest.Mock).mockResolvedValue(5);

      (prisma.tarea.create as jest.Mock).mockResolvedValue({
        id: "test-id-2",
        titulo: "Otra tarea",
      });

      const resultado = await crearTarea(
        "Otra tarea",
        undefined,
        "test-user-id"
      );

      expect(resultado.id).toBe("test-id-2");
      expect(prisma.tarea.create).toHaveBeenCalled();
    });
  });
});