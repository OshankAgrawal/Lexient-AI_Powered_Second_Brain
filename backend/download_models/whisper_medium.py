from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq

model_name = "openai/whisper-medium"

processor = AutoProcessor.from_pretrained(model_name)
model = AutoModelForSpeechSeq2Seq.from_pretrained(model_name)

# Saved Locally
save_path = "./whisper_local_model"

processor.save_pretrained(save_path)
model.save_pretrained(save_path)

print("Model saved successfully at: ", save_path)