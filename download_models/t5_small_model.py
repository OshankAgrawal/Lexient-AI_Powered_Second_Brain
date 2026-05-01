from transformers import T5Tokenizer, T5ForConditionalGeneration

model_name = "t5-small"

# Download from Hugging Face
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Saved Locally
save_path = "./t5_local_model"

tokenizer.save_pretrained(save_path)
model.save_pretrained(save_path)

print("Model saved successfully at: ", save_path)