package com.example.myapplication;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Button add,sub,mul,div;
        EditText fnum, snum;
        TextView result;

        add = findViewById(R.id.btnPlus);
        sub = findViewById(R.id.btnMinus);
        mul = findViewById(R.id.btntTimes);
        div = findViewById(R. id. btnDivide);

        fnum = findViewById(R.id.edtFnum);
        snum = findViewById(R.id.edtSnum);

        result = findViewById(R.id.lblResult);

        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(fnum.getText().toString().isEmpty()){
                    Toast.makeText(MainActivity.this, "First Number is empty", Toast.LENGTH_SHORT).show();
                    fnum.setText("0.0");
                } else if (snum.getText().toString().isEmpty()){
                    Toast.makeText(MainActivity.this, "Second Number is empty", Toast.LENGTH_SHORT).show();
                    snum.setText("0.0");
                }else{
                    Double total;
                    total = Double.parseDouble(String.valueOf(fnum.getText())) + Double.parseDouble(String.valueOf(snum.getText()));
                    result.setText("Results: " + total.toString());










                }
            }
        });

    }
}