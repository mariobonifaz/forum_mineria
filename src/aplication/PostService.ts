import { Post } from "../domain/Posts.ts";
import { PostRepository } from "../domain/PostRepository.ts";

async function procesarPost(post: Post): Promise<{ correctedText: string; containsBadWords: boolean }> {
  if (!post.content || !post.author) {
    throw new Error("Faltan campos obligatorios en el post.");
  }

  const response = await fetch("http://127.0.0.1:8000/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: post.content,
      author: post.author
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error del microservicio:", errorData);
    throw new Error("Error al procesar el post con el microservicio.");
  }

  const responseData = await response.json();

  console.log("Respuesta del microservicio Python:", responseData);

  // Transforma los datos de snake_case a camelCase
  return {
    correctedText: responseData.corrected_text,
    containsBadWords: responseData.contains_bad_words
  };
}

export class PostService {
  constructor(private postRepo: PostRepository) {}

  async createPost(post: Post): Promise<Post> {
    const resultado = await procesarPost(post);
  
    console.log("Resultado recibido en createPost:", resultado);
  
    if (resultado.containsBadWords) {
      console.warn("El contenido contiene palabras inapropiadas. Se reemplazará con un mensaje genérico.");
      post.content = "Este mensaje fue eliminado por contener palabras antisonantes.";
    } else if (!resultado.correctedText) {
      throw new Error("No se pudo corregir el contenido del post.");
    } else {
      post.content = resultado.correctedText; // Usa el texto corregido si es válido
    }
    post.createdAt = new Date();
  
    console.log("Guardando post con contenido corregido:", post);
  
    return await this.postRepo.create(post); // Aquí guardas el post en la base de datos
  }  

  async updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
    post.updatedAt = new Date();
    return await this.postRepo.update(id, post);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postRepo.delete(id);
  }

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepo.findById(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepo.findAll();
  }
}
