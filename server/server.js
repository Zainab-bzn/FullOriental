const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
app.use("/images", express.static(path.join(__dirname, "images")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "patisserie",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("✓ MySQL connected successfully");
    // Initialize database tables if they don't exist
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS custom_cakes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cake_type_id INT,
      cake_type VARCHAR(150) NOT NULL,
      tier_id INT,
      filling_id INT,
      addons JSON,
      notes TEXT,
      reference_photo VARCHAR(255),
      total_price DECIMAL(10, 2) NOT NULL,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cake_type_id) REFERENCES cake_types(id) ON DELETE SET NULL,
      FOREIGN KEY (tier_id) REFERENCES cake_tiers(id) ON DELETE SET NULL,
      FOREIGN KEY (filling_id) REFERENCES cake_fillings(id) ON DELETE SET NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )`,
    `CREATE TABLE IF NOT EXISTS cake_types (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      photo_path VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS cake_tiers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tier_name VARCHAR(100) NOT NULL,
      servings_min INT,
      servings_max INT,
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS cake_fillings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filling_name VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS cake_addons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      addon_name VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  tables.forEach((table, index) => {
    db.query(table, (err) => {
      if (err) {
        console.error(`Error creating table ${index}:`, err);
      } else {
        console.log(`✓ Table ${index + 1} initialized`);
      }
    });
  });
}


app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const checkQ = "SELECT id FROM users WHERE email = ? OR username = ?";
  db.query(checkQ, [email, username], (err, rows) => {
    if (err) {
      console.error("Register check error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ message: "Email or username already exists" });
    }

    const insertQ = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertQ, [username, email, password], (err2, result) => {
      if (err2) {
        console.error("Register insert error:", err2);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(201).json({
        message: "Registered successfully",
        userId: result.insertId,
      });
    });
  });
});

app.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const q =
    "SELECT id, username, email, password FROM users WHERE email = ? OR username = ? LIMIT 1";

  db.query(q, [identifier, identifier], (err, rows) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});


app.get("/cupcakes", (req, res) => {
  const q = "SELECT id, name, price FROM individual_cupcakes LIMIT 5";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Cupcakes error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(data || []);
  });
});

// HOME - BEST SELLERS
app.get("/best-sellers", (req, res) => {
  const q = "SELECT id, name, price FROM best_seller_boxes";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Best sellers error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(data || []);
  });
});

app.get("/menu", (req, res) => {
  const q = "SELECT id, name, description, price, category, image FROM products";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Menu error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(data || []);
  });
});

app.get("/individual-cupcakes", (req, res) => {
  const q = "SELECT id, name, description, price, image FROM individual_cupcakes";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Individual cupcakes error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log("Individual cupcakes fetched:", data?.length || 0);
    return res.json(data || []);
  });
});

// BEST SELLER CUPCAKES - GET ALL
app.get("/best-seller-cupcakes", (req, res) => {
  const q = "SELECT id, name, description, price, image FROM best_seller_boxes";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Best seller cupcakes error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log("Best seller cupcakes fetched:", data?.length || 0);
    return res.json(data || []);
  });
});


app.get("/cake-types", (req, res) => {
  const q = "SELECT id, name, photo_path FROM cake_types ORDER BY id";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Cake types error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log("Cake types fetched:", data?.length || 0);
    return res.json(data || []);
  });
});

app.get("/cakes", (req, res) => {
  const q = "SELECT id, name, description, price, image FROM cakes";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Cakes error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(data || []);
  });
});



app.get("/custom-cake/options", (req, res) => {
  const tiersQ = "SELECT id, tier_name, servings_min, servings_max, price FROM cake_tiers";
  const fillingsQ = "SELECT id, filling_name, price FROM cake_fillings";
  const addonsQ = "SELECT id, addon_name, price FROM cake_addons";

  db.query(tiersQ, (err1, tiers) => {
    if (err1) {
      console.error("Tiers error:", err1);
      return res.status(500).json({ message: "Database error" });
    }

    db.query(fillingsQ, (err2, fillings) => {
      if (err2) {
        console.error("Fillings error:", err2);
        return res.status(500).json({ message: "Database error" });
      }

      db.query(addonsQ, (err3, addons) => {
        if (err3) {
          console.error("Addons error:", err3);
          return res.status(500).json({ message: "Database error" });
        }

        return res.json({ tiers: tiers || [], fillings: fillings || [], addons: addons || [] });
      });
    });
  });
});


app.post("/cart/add", (req, res) => {
  const { userId, productId, productType, quantity, price, name, image } = req.body;

  if (!userId || !productId || price === undefined || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const q = 
    "INSERT INTO cart (user_id, product_id, product_type, item_name, quantity, price, image) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";

  db.query(
    q,
    [userId, productId, productType || "product", name, quantity || 1, price, image || null, quantity || 1],
    (err, result) => {
      if (err) {
        console.error("Add to cart error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(201).json({
        message: "Item added to cart",
        cartId: result.insertId || result.affectedRows,
      });
    }
  );
});


app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const q = "SELECT id, product_id, item_name, quantity, price, image, product_type FROM cart WHERE user_id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Get cart error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    const formatted = (data || []).map((item) => ({
      cartId: item.id,
      productId: item.product_id,
      name: item.item_name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      productType: item.product_type,
    }));

    return res.json(formatted);
  });
});

app.put("/cart/:cartId", (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  if (!cartId || quantity === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  const q = "UPDATE cart SET quantity = ? WHERE id = ?";

  db.query(q, [quantity, cartId], (err, result) => {
    if (err) {
      console.error("Update cart error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.json({ message: "Cart updated successfully" });
  });
});

// CART - DELETE ITEM FROM CART
app.delete("/cart/:cartId", (req, res) => {
  const { cartId } = req.params;
  if (!cartId) return res.status(400).json({ message: "Cart ID required" });

  const q = "DELETE FROM cart WHERE id = ?";

  db.query(q, [cartId], (err, result) => {
    if (err) {
      console.error("Delete cart error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.json({ message: "Item removed from cart" });
  });
});

app.delete("/cart-clear/:userId", (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const q = "DELETE FROM cart WHERE user_id = ?";

  db.query(q, [userId], (err, result) => {
    if (err) {
      console.error("Clear cart error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ message: "Cart cleared successfully" });
  });
});

app.post("/upload-reference", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  return res.json({
    message: "File uploaded successfully",
    filePath: `/images/${req.file.filename}`,
  });
});


app.post("/custom-cake/save", (req, res) => {
  const {
    cakeTypeId,
    cakeName,
    tierId,
    fillingId,
    addons,
    notes,
    referencePhoto,
    totalPrice,
    userId,
  } = req.body;

  if (!cakeName || totalPrice === undefined || totalPrice === null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const q =
    "INSERT INTO custom_cakes (cake_type_id, cake_type, tier_id, filling_id, addons, notes, reference_photo, total_price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    q,
    [
      cakeTypeId || null,
      cakeName,
      tierId || null,
      fillingId || null,
      addons ? JSON.stringify(addons) : null,
      notes || null,
      referencePhoto || null,
      totalPrice,
      userId || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Save custom cake error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(201).json({
        message: "Custom cake saved successfully",
        customCakeId: result.insertId,
      });
    }
  );
});

app.get("/custom-cakes/:ids", (req, res) => {
  const { ids } = req.params;
  if (!ids) return res.status(400).json({ message: "IDs required" });

  const idArray = ids
    .split(",")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));

  if (idArray.length === 0) {
    return res.status(400).json({ message: "Invalid IDs" });
  }

  const placeholders = idArray.map(() => "?").join(",");
  const q = `SELECT * FROM custom_cakes WHERE id IN (${placeholders})`;

  db.query(q, idArray, (err, data) => {
    if (err) {
      console.error("Get custom cakes error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const formatted = (data || []).map((cake) => ({
      id: cake.id,
      cakeType: cake.cake_type,
      tierId: cake.tier_id,
      fillingId: cake.filling_id,
      addons: cake.addons ? JSON.parse(cake.addons) : [],
      notes: cake.notes,
      referencePhoto: cake.reference_photo,
      totalPrice: cake.total_price,
      userId: cake.user_id,
      createdAt: cake.created_at,
    }));

    return res.json(formatted);
  });
});


app.post("/order", (req, res) => {
  const { name, email, address, items, totalPrice, userId } = req.body;

  if (!name || !email || !address || !items || items.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const orderNumber = "ORD-" + Date.now();

  const orderQ =
    "INSERT INTO orders (order_number, customer_name, customer_email, customer_address, total_amount, user_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(orderQ, [orderNumber, name, email, address, totalPrice, userId || null], (err, result) => {
    if (err) {
      console.error("Create order error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const orderId = result.insertId;

    let inserted = 0;
    let hasError = false;

    items.forEach((item) => {
      const itemQ =
        "INSERT INTO order_items (order_id, item_name, item_type, custom_cake_id, quantity, price) VALUES (?, ?, ?, ?, ?, ?)";

      db.query(
        itemQ,
        [
          orderId,
          item.name,
          item.type,
          item.customCakeId || null,
          item.quantity || 1,
          item.price,
        ],
        (err2) => {
          if (err2) {
            console.error("Insert order item error:", err2);
            hasError = true;
          }
          inserted++;

          if (inserted === items.length) {
            if (hasError) {
              return res.status(500).json({ message: "Error creating order items" });
            }
            return res.status(201).json({
              message: "Order created successfully",
              orderId,
              orderNumber,
            });
          }
        }
      );
    });
  });
});


app.get("/user-orders/:userId", (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const q = `
    SELECT o.id, o.order_number, o.customer_name, o.customer_email, o.customer_address,
           o.total_amount, o.created_at,
           oi.id AS item_id, oi.item_name, oi.item_type, oi.quantity, oi.price, oi.custom_cake_id
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Get user orders error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const map = {};
    (data || []).forEach((row) => {
      if (!map[row.id]) {
        map[row.id] = {
          id: row.id,
          orderNumber: row.order_number,
          customerName: row.customer_name,
          customerEmail: row.customer_email,
          customerAddress: row.customer_address,
          totalAmount: row.total_amount,
          createdAt: row.created_at,
          items: [],
        };
      }

      if (row.item_id) {
        map[row.id].items.push({
          itemId: row.item_id,
          itemName: row.item_name,
          itemType: row.item_type,
          quantity: row.quantity,
          price: row.price,
          customCakeId: row.custom_cake_id,
        });
      }
    });

    return res.json(Object.values(map));
  });
});

app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID required" });

  const q = "SELECT id, username, email, created_at FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      id: data[0].id,
      username: data[0].username,
      email: data[0].email,
      createdAt: data[0].created_at,
    });
  });
});


app.put("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  if (!userId) return res.status(400).json({ message: "User ID required" });
  if (!username && !email) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  let q = "UPDATE users SET ";
  let values = [];

  if (username) {
    q += "username = ?";
    values.push(username);
  }

  if (email) {
    if (values.length > 0) q += ", ";
    q += "email = ?";
    values.push(email);
  }

  q += " WHERE id = ?";
  values.push(userId);

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Update user error:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email or username already exists" });
      }
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User profile updated successfully" });
  });
});

app.get("/order/:orderNumber", (req, res) => {
  const { orderNumber } = req.params;
  if (!orderNumber) return res.status(400).json({ message: "Order number required" });

  const q = `
    SELECT o.id, o.order_number, o.customer_name, o.customer_email, o.customer_address,
           o.total_amount, o.status, o.created_at,
           oi.id AS item_id, oi.item_name, oi.item_type, oi.quantity, oi.price, oi.custom_cake_id
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_number = ?
  `;

  db.query(q, [orderNumber], (err, data) => {
    if (err) {
      console.error("Get order error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = {
      id: data[0].id,
      orderNumber: data[0].order_number,
      customerName: data[0].customer_name,
      customerEmail: data[0].customer_email,
      customerAddress: data[0].customer_address,
      totalAmount: data[0].total_amount,
      status: data[0].status,
      createdAt: data[0].created_at,
      items: [],
    };

    data.forEach((row) => {
      if (row.item_id) {
        order.items.push({
          itemId: row.item_id,
          itemName: row.item_name,
          itemType: row.item_type,
          quantity: row.quantity,
          price: row.price,
          customCakeId: row.custom_cake_id,
        });
      }
    });

    return res.json(order);
  });
});

app.get("/order-by-id/:orderId", (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ message: "Order ID required" });

  const q = `
    SELECT o.id, o.order_number, o.customer_name, o.customer_email, o.customer_address,
           o.total_amount, o.status, o.created_at,
           oi.id AS item_id, oi.item_name, oi.item_type, oi.quantity, oi.price, oi.custom_cake_id
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.id = ?
  `;

  db.query(q, [orderId], (err, data) => {
    if (err) {
      console.error("Get order by ID error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = {
      id: data[0].id,
      orderNumber: data[0].order_number,
      customerName: data[0].customer_name,
      customerEmail: data[0].customer_email,
      customerAddress: data[0].customer_address,
      totalAmount: data[0].total_amount,
      status: data[0].status,
      createdAt: data[0].created_at,
      items: [],
    };

    data.forEach((row) => {
      if (row.item_id) {
        order.items.push({
          itemId: row.item_id,
          itemName: row.item_name,
          itemType: row.item_type,
          quantity: row.quantity,
          price: row.price,
          customCakeId: row.custom_cake_id,
        });
      }
    });

    return res.json(order);
  });
});

app.get("/admin/cakes", (req, res) => {
  const q = "SELECT * FROM cake_types ORDER BY id DESC";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Admin cakes error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(data || []);
  });
});

app.get("/admin/cakes/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM cake_types WHERE id = ?";
  
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Get cake error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    
    return res.json(data[0]);
  });
});

app.post("/admin/addCake", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const photo_path = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ message: "Cake name is required" });
  }

  const q = "INSERT INTO cake_types (name, photo_path) VALUES (?, ?)";
  
  db.query(q, [name, photo_path], (err, result) => {
    if (err) {
      console.error("Add cake error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    return res.json({ 
      message: "Cake added successfully",
      id: result.insertId 
    });
  });
});


app.post("/admin/updateCake/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const photo_path = req.file ? req.file.filename : null;

  let q, values;

  if (photo_path) {
    q = "UPDATE cake_types SET name = ?, photo_path = ? WHERE id = ?";
    values = [name, photo_path, id];
  } else {
    q = "UPDATE cake_types SET name = ? WHERE id = ?";
    values = [name, id];
  }

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Update cake error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    
    return res.json({ message: "Cake updated successfully" });
  });
});


app.delete("/admin/cakes/:id", (req, res) => {
  const id = req.params.id;

  const getImageQuery = "SELECT photo_path FROM cake_types WHERE id = ?";
  
  db.query(getImageQuery, [id], (err, result) => {
    if (err) {
      console.error("Get cake image error:", err);
      return res.status(500).json({ error: "Database error" });
    }


    const deleteQuery = "DELETE FROM cake_types WHERE id = ?";
    
    db.query(deleteQuery, [id], (err2, data) => {
      if (err2) {
        console.error("Delete cake error:", err2);
        return res.status(500).json({ error: "Database error" });
      }
      
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Cake not found" });
      }

      // Delete image file if exists
      if (result.length > 0 && result[0].photo_path) {
        const filePath = path.join(__dirname, "images", result[0].photo_path);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err3) => {
            if (err3) console.error("Error deleting image:", err3);
          });
        }
      }

      return res.json({ message: "Cake deleted successfully" });
    });
  });
});

app.get("/admin/custom-cakes", (req, res) => {
  // First check if table exists
  const checkTableQ = "SELECT COUNT(*) as count FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'patisserie' AND TABLE_NAME = 'custom_cakes'";
  
  db.query(checkTableQ, (tableCheckErr, tableCheckResult) => {
    if (tableCheckErr) {
      console.error("Table check error:", tableCheckErr);
      return res.status(500).json({ message: "Database check error", error: tableCheckErr });
    }
    
    const tableExists = tableCheckResult && tableCheckResult[0] && tableCheckResult[0].count > 0;
    console.log("Custom cakes table exists:", tableExists);
    
    if (!tableExists) {
      return res.status(500).json({ message: "custom_cakes table does not exist in database" });
    }
  
    const q = `
      SELECT 
        cc.id,
        cc.cake_type,
        cc.tier_id,
        cc.filling_id,
        cc.addons,
        cc.notes,
        cc.reference_photo,
        cc.total_price,
        cc.user_id,
        cc.created_at,
        ct.name AS cake_type_name,
        t.tier_name,
        f.filling_name
      FROM custom_cakes cc
      LEFT JOIN cake_types ct ON cc.cake_type_id = ct.id
      LEFT JOIN cake_tiers t ON cc.tier_id = t.id
      LEFT JOIN cake_fillings f ON cc.filling_id = f.id
      ORDER BY cc.created_at DESC
    `;

    db.query(q, (err, data) => {
      if (err) {
        console.error("Get custom cakes error:", err);
        return res.status(500).json({ message: "Database error", error: err.message });
      }

      const formatted = (data || []).map((row) => ({
        ...row,
        addons: row.addons ? JSON.parse(row.addons) : [],
      }));

      return res.json(formatted);
    });
  });
});

app.post("/feedback", (req, res) => {
  const { userId, orderId, stars, comment } = req.body;

  if (!stars || stars < 1 || stars > 5) {
    return res.status(400).json({ message: "Stars must be between 1 and 5" });
  }

  const q =
    "INSERT INTO feedback (user_id, order_id, stars, comment) VALUES (?, ?, ?, ?)";

  db.query(q, [userId || null, orderId || null, stars, comment || null], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    return res.json({ message: "Feedback saved successfully!" });
  });
});

app.get("/feedback", (req, res) => {
  const q = "SELECT * FROM feedback ORDER BY created_at DESC";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    return res.json(data);
  });
});

app.delete("/feedback/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM feedback WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.json({ message: "Feedback deleted successfully!" });
  });
});

app.listen(port, () => {
  console.log(`\n✓ Server started successfully on port ${port}`);
  console.log(`✓ API available at http://localhost:${port}`);
});