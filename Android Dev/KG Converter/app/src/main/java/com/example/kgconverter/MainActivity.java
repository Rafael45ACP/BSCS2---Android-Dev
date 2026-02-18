package com.example.kgconverter;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.kgconverter.R;

public class MainActivity extends AppCompatActivity {

    EditText edtgram;
    TextView txtRes;
    Button btnConvert;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtgram = findViewById(R.id.edtgram);
        txtRes = findViewById(R.id.txtRes);
        btnConvert = findViewById(R.id.btnConvert);

        btnConvert.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                double g = Double.parseDouble(edtgram.getText().toString());
                double kg = g / 1000;
                txtRes.setText(kg + " kg");
            }
        });
    }
}
