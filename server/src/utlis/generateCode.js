require("dotenv").config();

const generateCode = (value) => {
   // Chuẩn hóa và loại bỏ dấu tiếng Việt
   let normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

   // Chuyển đổi thành chữ thường để đảm bảo tính đồng nhất
   let lowercaseValue = normalizedValue.toLowerCase();

   // Loại bỏ khoảng trắng và ký tự đặc biệt để tránh ảnh hưởng đến mã code
   let cleanedValue = lowercaseValue.replace(/[^a-z0-9]/g, "");

   // Ghép chuỗi với mã bảo mật
   let merge = cleanedValue + process.env.SECRET_GENERATE;

   let output = "";
   let length = merge.length;

   // Tạo mã code
   for (let i = 0; i < 3; i++) {
      let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2);
      output += merge.charAt(index);
      length = index;
   }

   // Thêm một phần của chuỗi đầu vào vào mã code (ở đây là 5 ký tự đầu tiên)
   // output += cleanedValue.substring(0, 5);

   return output.toUpperCase();
};

export default generateCode;
